import { Component, Input } from '@angular/core';
import { LayoutService } from '../services/layout/layout.service';
import { EditComponentService } from '../services/edit-component/edit-component.service';
import { getLayoutFromId } from '../helper/get-layout-from-id';
import { Element, PropType } from '../data/elements';
import { getElementMetaFromName } from '../helper/get-element-meta';
import { ILayout } from '@nexus/components';
import { toPairs } from 'lodash/fp';

@Component({
  selector: 'nexus-edit-pane',
  templateUrl: './edit-pane.component.html',
  styleUrl: './edit-pane.component.scss',
})
export class EditPaneComponent {
  @Input({ required: false }) editComponentId: string | undefined;
  layout!: ILayout;
  componentMetadata: Element | null = null;

  propKeyValue: [string, PropType][] = [];

  constructor(
    private layoutService: LayoutService,
    editComponentService: EditComponentService
  ) {
    editComponentService.editedComponentId$.subscribe((val) => {
      if (!val) {
        return;
      }
      const layout = getLayoutFromId(val, this.layoutService.layout);
      if (!layout) {
        throw new Error('Layout not found');
      }
      this.layout = layout;
      this.componentMetadata = getElementMetaFromName(layout.name);
      this.propKeyValue = toPairs(this.componentMetadata.props).map(
        (keyValue) => {
          return keyValue;
        }
      );
    });
  }

  protected readonly PropType = PropType;
}
