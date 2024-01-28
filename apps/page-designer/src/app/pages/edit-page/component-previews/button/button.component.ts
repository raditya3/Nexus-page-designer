import { Component, Input, OnInit } from '@angular/core';
import { ComponentPreview } from '../component-preview.base';

@Component({
  selector: 'nexus-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent extends ComponentPreview implements OnInit {
  @Input({ required: true }) override id!: string;

  ngOnInit(): void {
    this.initializeLayout();
  }
}
