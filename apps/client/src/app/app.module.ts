import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NexusComponentsModule } from '@nexus/components';
import { AppComponent } from "./app.component";
@NgModule({
    imports: [NexusComponentsModule, BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {

}