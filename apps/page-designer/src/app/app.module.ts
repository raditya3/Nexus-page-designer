import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routes";
import { AppComponent } from "./app.component";

@NgModule({
    imports: [CommonModule, BrowserModule, RouterModule.forRoot(appRoutes)],
    providers: [],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }