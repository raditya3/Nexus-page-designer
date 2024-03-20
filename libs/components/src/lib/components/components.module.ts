import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpaConfigRendererComponent } from './spa-config-renderer/spa-config-renderer.component';
import { LayoutRendererComponent } from './layout-renderer/layout-renderer.component';
import { MultiColumnComponent } from './custom/multi-column/multi-column.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SpaConfigRendererComponent,
    LayoutRendererComponent,
    MultiColumnComponent,
  ],
  exports: [SpaConfigRendererComponent, LayoutRendererComponent],
})
export class NexusComponentsModule {}
