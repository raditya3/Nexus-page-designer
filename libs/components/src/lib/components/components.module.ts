import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SpaConfigRendererComponent } from "./spa-config-renderer/spa-config-renderer.component";
import { LayoutRendererComponent } from "./layout-renderer/layout-renderer.component";

@NgModule({
    imports: [CommonModule,],
    declarations: [SpaConfigRendererComponent, LayoutRendererComponent],
    exports: [SpaConfigRendererComponent, LayoutRendererComponent]
})
export class NexusComponentsModule {

}