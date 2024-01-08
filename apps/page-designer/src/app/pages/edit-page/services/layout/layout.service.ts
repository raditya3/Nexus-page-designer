import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILayout } from '@nexus/components';
import { getLayoutConfigFromElement } from '../../component-previews/helper/get-layout-json';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  layout$: BehaviorSubject<ILayout>;


  constructor() {
    this.layout$ = new BehaviorSubject<ILayout>(getLayoutConfigFromElement('div'));
    this.layout$.subscribe(_layout => {
      this.layout = _layout;
    })
  }
  layout!: ILayout;

  public appendChildToLayout(id: string, layout: ILayout, index: number) {
    this._appendChildToLayout(id, this.layout, layout, index);
  }

  private _appendChildToLayout(id: string, oldLayout: ILayout, layout: ILayout, index: number): boolean {
    if (id === oldLayout.props!.id) {
      oldLayout.children = [
        ...oldLayout.children!.slice(0, index),
        layout,
        ...oldLayout.children!.slice(index)
      ];
      return true;
    }

    if (!oldLayout.children) {
      return false;
    }
    for (let i = 0; i < oldLayout.children.length; i++) {
      const res = this._appendChildToLayout(id, oldLayout.children[i], layout, index);
      if (res) {
        return true;
      }
    }
    return false
  }
}
