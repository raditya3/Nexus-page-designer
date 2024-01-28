import { EditComponentService } from '../services/edit-component/edit-component.service';
import { inject } from '@angular/core';
import { LayoutService } from '../services/layout/layout.service';
import { ILayout } from '@nexus/components';
import { getLayoutFromId } from '../helper/get-layout-from-id';

export class ComponentPreview {
  private editComponentService: EditComponentService;
  protected layoutService: LayoutService;
  protected thisLayout!: ILayout;

  protected initializeLayout() {
    this.layoutService.layout$.subscribe((layout) => {
      this.thisLayout = getLayoutFromId(this.id, layout)!;
    });
  }

  constructor() {
    this.editComponentService = inject(EditComponentService);
    this.layoutService = inject(LayoutService);
  }
  protected id!: string;
  markThisAsEdit() {
    this.editComponentService.editedComponentId$.next(this.id);
  }
}
