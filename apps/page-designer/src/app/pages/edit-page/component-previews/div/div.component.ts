import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';
import { ILayout } from '@nexus/components';
import { getLayoutFromId } from '../helper/get-layout-from-id';
import { getLayoutConfigFromElement } from '../helper/get-layout-json';

@Component({
  selector: 'nexus-div',
  templateUrl: './div.component.html',
  styleUrl: './div.component.scss',
})
export class DivComponent implements OnInit {


  constructor(private layoutService: LayoutService) { }
  @Input({ required: true }) id!: string;
  allowDrag(ev: DragEvent) {
    ev.preventDefault();
  }
  thisLayout!: ILayout;



  ngOnInit(): void {
    this.layoutService.layout$.subscribe(layout => {
      const identifiedLayout = getLayoutFromId(this.id, layout)!;
      this.thisLayout = identifiedLayout;
    })
  }

  onDrop(ev: DragEvent, index: number) {
    const element: string = ev.dataTransfer!.getData("element");
    this.layoutService.appendChildToLayout(this.id, getLayoutConfigFromElement(element), index + 1)
  }


}
