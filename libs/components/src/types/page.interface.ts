import { IDerived } from "./derived.interface";
import { ILayout } from "./layout.interface";
import { Prop } from "./properties.type";

export interface IPage {
    style: string;
    layout: ILayout;
    context: {
        properties: Prop[];
        derived: IDerived[];
    }
}