import { Type } from "@angular/core";
import { ElementBrowserComponent } from "../toolbar/element-browser/element-browser.component";
export interface Tab {
    display: string;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    block: Type<any>
}
export const tabs: Tab[] = [
    {
        display: "Elements",
        name: "elements",
        block: ElementBrowserComponent
    },
    {
        display: "Context",
        name: "context",
        block: ElementBrowserComponent
    },
    {
        display: "Service Calls",
        name: "service",
        block: ElementBrowserComponent
    },
];