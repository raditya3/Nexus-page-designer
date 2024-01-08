import { ChangeDetectorRef, EventEmitter, Output } from "@angular/core";

export class BaseComponent {

    constructor(private cdr: ChangeDetectorRef) { }
    public triggerCdr() {
        this.cdr.detectChanges();
    }
}