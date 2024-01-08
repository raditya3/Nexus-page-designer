import { Component } from '@angular/core';
import { Tab, tabs } from '../data/tabs';
import { LayoutService } from '../services/layout/layout.service';
@Component({
  selector: 'nexus-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {


  tabs = tabs;
  private _activeTab!: string;
  public activeElement!: Tab["block"];

  constructor(private layoutService: LayoutService) {
    this.activeTab = tabs[0].name;
  }


  preview() {
    console.log(this.layoutService.layout);
  }

  public set activeTab(val: Tab["name"]) {
    this.activeElement = tabs.find(tab => tab.name === val)!.block;
    this._activeTab = val;
  };
  public get activeTab() {
    return this._activeTab;
  }
}
