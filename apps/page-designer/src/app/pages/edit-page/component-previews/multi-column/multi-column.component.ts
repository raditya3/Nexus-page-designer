import { Component, Input, OnInit } from '@angular/core';
import { ComponentPreview } from '../component-preview.base';
import { getLayoutConfigFromElement } from "../../helper/get-layout-json";
import { ILayout } from '@nexus/components';

@Component({
  selector: 'nexus-multi-column',
  templateUrl: './multi-column.component.html',
  styleUrl: './multi-column.component.scss',
})
export class MultiColumnComponent extends ComponentPreview implements OnInit {
		allowDrag(ev: DragEvent) {
			ev.preventDefault();
		}

		@Input({ required: true }) override id!: string;

		onDrop(ev: DragEvent, index: number) {
			const element: string = ev.dataTransfer!.getData("element");
			this.layoutService.appendChildToLayout(
				this.id,
				getLayoutConfigFromElement(element),
				index + 1,
			);
		}

		ngOnInit(): void {
			this.initializeLayout();
			console.log(this.thisLayout);
		}
	}
