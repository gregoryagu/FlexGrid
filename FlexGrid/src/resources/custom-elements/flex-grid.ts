
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
        this.items = newValue;
    } 


    attached(param: any): void {
        let options: any = {
            columns: [
                { header: 'First Name', binding: 'FirstName', required: false },
                { header: 'Last Name', binding: 'LastName', required: false }
            ],
            autoGenerateColumns: false
        };
        this.control = new wijmo.grid.FlexGrid(this.element, options);
        

        if (this.items != null) {
            this.control.itemsSource = this.items;
        }
    } 
}