import { Component, Input, OnInit } from '@angular/core';
import { getLayoutConfigFromElement } from '../../helper/get-layout-json';
import { ComponentPreview } from '../component-preview.base';

@Component({
  selector: 'nexus-div',
  templateUrl: './div.component.html',
  styleUrl: './div.component.scss',
})
export class DivComponent extends ComponentPreview implements OnInit {
  allowDrag(ev: DragEvent) {
    ev.preventDefault();
  }

  @Input({ required: true }) override id!: string;
  onDrop(ev: DragEvent, index: number) {
    const element: string = ev.dataTransfer!.getData('element');
    this.layoutService.appendChildToLayout(
      this.id,
      getLayoutConfigFromElement(element),
      index + 1
    );
  }

  ngOnInit(): void {
    this.initializeLayout();
  }
}
