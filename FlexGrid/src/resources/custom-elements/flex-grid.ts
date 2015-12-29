
import {bindable, customElement, inject, bindingMode} from 'aurelia-framework';
import {BreezeCollectionView} from "resources/data/breeze-collection-view";

@inject(Element)
@customElement("wj-flex-grid")
export class WjFlexGrid {

    
    element: HTMLElement;
    control: wijmo.grid.FlexGrid;
    @bindable items: BreezeCollectionView;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    itemsChanged(newValue: any, oldValue: any) {
        alert("Items Changed");
        this.items = newValue;
    } 


    attached(param: any): void {
        this.control = new wijmo.grid.FlexGrid(this.element);
        this.control.autoGenerateColumns = true;
        if (this.items != null) {
            this.control.itemsSource = this.items;
        }
    }

    
}