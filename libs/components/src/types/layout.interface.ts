export interface ILayout {
    name: string;
    props?: any;
    events?: { [key: string]: [string, string][]; }
    children?: ILayout[]
}