import { ChangeDetectorRef } from '@angular/core';

export class BaseComponent {
  [key: string]: unknown;
  constructor(private cdr: ChangeDetectorRef) {}
  public triggerCdr() {
    this.cdr.detectChanges();
  }
}
