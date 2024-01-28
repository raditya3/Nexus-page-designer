import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Renderer2,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { PageContextService } from '../context.service';
import { ILayout, Prop } from '../../../types';
import { standardHtmlTags } from '../../../helper/standard-html-elements';
import { cookTemplateString } from '../../../helper/cook-template-string';
import { getTokensFromString } from '../../../helper/get-tokens-from-string';
import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { customComponents } from '../custom/custom-components.map';
import { stringToFunction } from '../../../helper';
import { BaseComponent } from '../custom/base.component';

@Component({
  selector: 'nexus-layout-renderer',
  templateUrl: './layout-renderer.component.html',
  styleUrl: './layout-renderer.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LayoutRendererComponent implements AfterViewInit, OnDestroy {
  constructor(
    private pageContextService: PageContextService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  @Input({ required: true }) layout!: ILayout;
  @Input({ required: false }) localContext: Map<
    string,
    BehaviorSubject<Prop[1]>
  > = new Map();

  @Input({ required: false }) renderChildren = true;

  private subsBag: Subscription[] = [];

  private childComponentRefs: ComponentRef<
    BaseComponent | LayoutRendererComponent
  >[] = [];
  private activeEvents: (() => void)[] = [];
  ngOnDestroy(): void {
    this.activeEvents.forEach((ev) => ev());
    this.childComponentRefs.forEach((ref) => {
      ref.destroy();
    });
    this.subsBag.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private isDynamicProp(propName: string) {
    return /^\[\w+]$/.test(propName);
  }

  private getResolvedPropName(propName: string) {
    const matched = propName.match(/^\[(\w+)]$/);
    return matched ? matched[1] : null;
  }
  private checkStandardHtmlTag(tagName: string) {
    return standardHtmlTags.includes(tagName);
  }

  private getObservableFromToken(token: string) {
    return this.pageContextService.propsVariables.get(token);
  }
  private setAttributeToTag(
    element: Element,
    prop: string,
    propValue: Prop[1]
  ) {
    if (typeof propValue !== 'string') {
      return;
    }
    if (prop === 'innerHTML') {
      element.innerHTML = propValue;
    } else {
      this.renderer.setAttribute(element, prop, propValue);
    }
  }

  private subscribeToPageContextProps(
    props: ILayout['props'],
    callback: (resolvedPropName: string, processedPropValue: Prop[1]) => void
  ) {
    for (const prop in props) {
      if (this.isDynamicProp(prop)) {
        const propValue = props[prop];
        if (typeof propValue !== 'string') {
          return;
        }
        const tokens = getTokensFromString(propValue);
        if (!tokens) {
          return;
        }
        const resolvedPropName = this.getResolvedPropName(prop)!;
        const tokens$ = tokens?.map((token) => {
          if (token.context === 'pageContext') {
            return this.getObservableFromToken(token.contextVariable);
          } else {
            return undefined;
          }
        });
        const sub = combineLatest(
          tokens$ as BehaviorSubject<Prop[1]>[]
        ).subscribe((values) => {
          let processedPropValue = propValue;
          values.forEach((val, idx) => {
            if (typeof val !== 'string') {
              throw new Error('Invalid Prop value');
            }
            const token = tokens[idx];
            const tokenPath = [token.context, token.contextVariable, token.path]
              .filter((v) => !!v)
              .join('.');
            processedPropValue = cookTemplateString(
              processedPropValue,
              tokenPath,
              val
            );
          });
          callback(resolvedPropName, processedPropValue);
        });
        this.subsBag.push(sub);
      } else {
        callback(prop, props[prop]);
      }
    }
  }

  private getHtmlElementFromLayout(layout: ILayout) {
    const element = this.renderer.createElement(layout.name);

    this.subscribeToPageContextProps(
      this.layout.props,
      (resolvedPropsName, processedPropValue) => {
        this.setAttributeToTag(element, resolvedPropsName, processedPropValue);
      }
    );

    return element;
  }

  private submitEventToContext(events: [string, string][], val: Prop[1]) {
    events.forEach(([contextVar, specStr]) => {
      const specFn = stringToFunction(specStr);
      const calculatedVal = specFn(val);
      const contextVarSplit = contextVar.split('.');
      const context = contextVarSplit.shift()! as
        | 'pageContext'
        | 'localContext';
      if (context === 'pageContext') {
        const pageContextVar = contextVarSplit[0];
        this.pageContextService.propsVariables
          .get(pageContextVar)
          ?.next(calculatedVal);
      }
    });
  }

  private element!: Element;
  ngAfterViewInit(): void {
    if (this.checkStandardHtmlTag(this.layout.name)) {
      this.element = this.getHtmlElementFromLayout(this.layout);
      for (const event in this.layout.events) {
        const removeListener = this.renderer.listen(
          this.element,
          event,
          (val) => {
            this.submitEventToContext(this.layout.events![event], val);
          }
        );
        this.activeEvents.push(removeListener);
      }
      this.renderer.appendChild(this.elementRef.nativeElement, this.element);
      if (!this.renderChildren) {
        return;
      }
      this.layout.children?.forEach((childLayout) => {
        const childRef = this.viewContainerRef.createComponent(
          LayoutRendererComponent
        );
        childRef.instance['layout'] = childLayout;
        this.renderer.appendChild(
          this.element,
          childRef.location.nativeElement
        );
        this.childComponentRefs.push(childRef);
      });
    } else {
      const ComponentClass = customComponents[this.layout.name];
      if (ComponentClass == undefined) {
        throw new Error('Invalid Component: ' + this.layout.name);
      }
      const customComponentsRef =
        this.viewContainerRef.createComponent(ComponentClass);
      this.renderer.appendChild(
        this.elementRef.nativeElement,
        customComponentsRef.location.nativeElement
      );
      this.childComponentRefs.push(customComponentsRef);
      for (const event in this.layout.events) {
        const propName = `${event}$`;
        const property = customComponentsRef.instance[propName];
        if (property instanceof EventEmitter) {
          property.subscribe((val) => {
            this.submitEventToContext(this.layout.events![event], val);
          });
        }
      }

      this.subscribeToPageContextProps(
        this.layout.props,
        (propName, propValue) => {
          customComponentsRef.instance[propName] = propValue;
          customComponentsRef.instance.triggerCdr();
        }
      );
    }
  }
}
