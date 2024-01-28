import { Prop } from './properties.type';

export interface ILayout {
  name: string;
  props?: { [key: string]: Prop[1] };
  events?: { [key: string]: [string, string][] };
  children?: ILayout[];
}
