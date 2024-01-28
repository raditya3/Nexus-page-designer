import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { PageContextService } from '../context.service';
import { ILayout, IPage } from '../../../types';

@Component({
  selector: 'nexus-spa-config-renderer',
  templateUrl: './spa-config-renderer.component.html',
  styleUrl: './spa-config-renderer.component.scss',
})
export class SpaConfigRendererComponent implements OnInit, OnDestroy {
  @Input({ required: true }) config!: IPage;

  constructor(
    private contextService: PageContextService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}
  public layout!: ILayout;

  ngOnDestroy(): void {
    this.contextService.unsubscribe();
  }

  ngOnInit(): void {
    this.contextService.initialize(this.config.context);
    this.layout = this.config.layout;
    const style = this.config.style;
    const styleElement = this.renderer.createElement('style');
    this.renderer.setProperty(styleElement, 'textContent', style);
    this.renderer.appendChild(
      this.elementRef.nativeElement.ownerDocument.head,
      styleElement
    );
  }
}
