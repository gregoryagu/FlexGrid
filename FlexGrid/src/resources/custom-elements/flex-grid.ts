import {bindable, customElement, inject, bindingMode} from 'aurelia-framework';
import {BreezeCollectionView} from "resources/data/breeze-collection-view";
import {AppLogger} from "resources/core/app-logger";

@inject(Element, AppLogger)
@customElement("wj-flex-grid")
export class WjFlexGrid {

    
    control: wijmo.grid.FlexGrid;
    @bindable items: BreezeCollectionView;
    //numberInput: number;

    constructor(private element: HTMLElement, private appLogger: AppLogger) {
        
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

            this.items.querySucceeded.addHandler((sender: any, e: any) => {
                //if (this.numberInput) {
                    //this.numberInput.max = this.items.pageCount;
                //}
                this.appLogger.querySucceeded(e.data);
            });

            this.items.queryFailed.addHandler((sender: any, e: any) => {
                this.appLogger.queryFailed(e.data.message);
            });

            this.items.saveSucceeded.addHandler((sender: any, e: any) => {
                this.appLogger.saveSucceeded(e.data);
            });

            this.items.saveFailed.addHandler((sender: any, e: any) => {
                this.appLogger.saveFailed(e.data);
            });





        }
    }
    

    
     
}