import { BaseComponent } from './base.component';
import { MultiColumnComponent } from './multi-column/multi-column.component';


export const customComponents: {
	[key: string]: new (...args: any[]) => BaseComponent;
} = {
	"multi-column": MultiColumnComponent
};
