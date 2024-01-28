import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILayout } from '@nexus/components';
import { getLayoutConfigFromElement } from '../../helper/get-layout-json';
@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  layout$: BehaviorSubject<ILayout>;

  constructor() {
    this.layout$ = new BehaviorSubject<ILayout>(
      getLayoutConfigFromElement('div')
    );
    this.layout$.subscribe((_layout) => {
      this.layout = _layout;
    });
  }
  layout!: ILayout;

  public appendChildToLayout(id: string, layout: ILayout, index: number) {
    this._appendChildToLayout(id, this.layout, layout, index);
  }

  public updatePropToLayoutById(
    id: string,
    propName: string,
    propValue: unknown
  ) {
    if (propName === id) {
      throw new Error('Prop name cannot be ID');
    }
    const res = this._updatePropToLayoutById(
      id,
      propName,
      propValue,
      this.layout
    );
    if (!res) {
      throw new Error('No layout found with id: ' + id);
    }
  }

  private _updatePropToLayoutById(
    id: string,
    propName: string,
    propValue: unknown,
    layout: ILayout
  ) {
    if (id === layout.props!['id']) {
      layout.props![propName] = propValue;
      return true;
    }
    if (layout.children && layout.children.length > 0) {
      for (let i = 0; i < layout.children.length; i++) {
        const res = this._updatePropToLayoutById(
          id,
          propName,
          propValue,
          layout.children[i]
        );
        if (res) {
          return true;
        }
      }
    }
    return false;
  }

  private _appendChildToLayout(
    id: string,
    oldLayout: ILayout,
    layout: ILayout,
    index: number
  ): boolean {
    if (id === oldLayout.props!['id']) {
      oldLayout.children = [
        ...oldLayout.children!.slice(0, index),
        layout,
        ...oldLayout.children!.slice(index),
      ];
      return true;
    }

    if (!oldLayout.children) {
      return false;
    }
    for (let i = 0; i < oldLayout.children.length; i++) {
      const res = this._appendChildToLayout(
        id,
        oldLayout.children[i],
        layout,
        index
      );
      if (res) {
        return true;
      }
    }
    return false;
  }
}
