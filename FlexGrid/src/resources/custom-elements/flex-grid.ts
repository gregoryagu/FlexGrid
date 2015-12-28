
import {bindable, customElement, inject, bindingMode} from 'aurelia-framework';
import {BreezeCollectionView} from "resources/data/BreezeCollectionView";

@inject(Element)
@customElement("wj-flex-grid")
export class WjFlexGrid {

    
    element: HTMLElement;
    control: any;
    @bindable items: BreezeCollectionView;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    itemsChanged(newValue: any, oldValue: any) {
        this.items = newValue;
    } 


    attached(param: any): void {
        this.control = new wijmo.grid.FlexGrid(this.element);
        this.control.isReadOnly = true;
        if (this.items != null) {
            this.control.itemsSource = this.items.sourceCollection;
        }
    }

    
}