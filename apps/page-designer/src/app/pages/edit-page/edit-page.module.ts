import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPageComponent } from './edit-page.component';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ElementBrowserComponent } from './toolbar/element-browser/element-browser.component';
import { PreviewComponent } from './preview/preview.component';
import { LayoutService } from './services/layout/layout.service';
import { PREVIEW_COMPONENT_DECLARATIONS } from './component-previews/preview-component.declarations';
@NgModule({
  declarations: [
    EditPageComponent,
    ToolbarComponent,
    ElementBrowserComponent,
    PreviewComponent,
    ...PREVIEW_COMPONENT_DECLARATIONS
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditPageComponent,
      },
    ]),
  ],
  providers: [LayoutService]
})
export class EditPageModule { }
