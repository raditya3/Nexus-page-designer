import { Component } from '@angular/core';
import { elements } from '../../data/elements';
@Component({
  selector: 'nexus-element-browser',
  templateUrl: './element-browser.component.html',
  styleUrl: './element-browser.component.scss',
})
export class ElementBrowserComponent {
  elementList = elements;



  dragStart(ev: DragEvent, elementName: string) {
    ev.dataTransfer?.setData("element", elementName);
  }
}
