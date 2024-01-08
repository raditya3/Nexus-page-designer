import { Component } from '@angular/core';
import { LayoutService } from './services/layout/layout.service';
import { ILayout } from '@nexus/components';

@Component({
  selector: 'nexus-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
})
export class EditPageComponent {

  public layout!: ILayout
  constructor(public layoutService: LayoutService) {
    layoutService.layout$.subscribe(_layout => {
      this.layout = _layout
    })
  }
}
