import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';
import { getLayoutFromId } from '../helper/get-layout-from-id';
import { ILayout } from '@nexus/components';

@Component({
  selector: 'nexus-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }
  @Input({ required: true }) id!: string;
  thisLayout!: ILayout;
  ngOnInit(): void {
    this.layoutService.layout$.subscribe(layout => {
      const identifiedLayout = getLayoutFromId(this.id, layout)!;
      this.thisLayout = identifiedLayout;
    })
  }
}
