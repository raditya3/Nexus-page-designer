import { Type } from '@angular/core';
import { ButtonComponent } from '../component-previews/button/button.component';
import { DivComponent } from '../component-previews/div/div.component';
export enum PropType {
  STRING,
  BOOLEAN,
}
export interface Element {
  display: string;
  name: string;
  props: { [key: string]: PropType };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  block: Type<any>;
}
export const elements: Element[] = [
  {
    display: 'Div',
    name: 'div',
    block: DivComponent,
    props: { class: PropType.STRING },
  },
  {
    display: 'Button',
    name: 'button',
    block: ButtonComponent,
    props: {},
  },
];
