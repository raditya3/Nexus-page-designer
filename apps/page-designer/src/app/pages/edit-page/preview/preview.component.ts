import { Component, Input, OnInit } from '@angular/core';
import { ILayout } from '@nexus/components';
import { Element, elements } from '../data/elements';
@Component({
  selector: 'nexus-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent implements OnInit {
  @Input({ required: true }) layout!: ILayout;
  block!: Element["block"];
  idInput = {};
  ngOnInit(): void {
    this.block = elements.find(v => v.name === this.layout.name)!.block;
    this.idInput = { "id": this.layout.props!.id };
  }
}
