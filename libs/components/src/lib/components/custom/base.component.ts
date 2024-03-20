import { ChangeDetectorRef } from '@angular/core';

export class BaseComponent {
  [key: string]: unknown;
  protected cdr! : ChangeDetectorRef;
  public triggerCdr() {
    this.cdr.detectChanges();
  }
}
