import {autoinject, inject, singleton} from "aurelia-framework";
import {EntityManagerProvider} from "resources/data/entity-manager-provider";
import errorHandler from "resources/core/error-handler";
import {AppLogger} from "resources/core/app-logger";
import {BreezeCollectionView} from "resources/data/breeze-collection-view";

@inject(EntityManagerProvider, AppLogger)
export class Welcome {

    loggerTitle: string = "FileRowMaps";
    items: BreezeCollectionView;
    entityManager: breeze.EntityManager;
    options: any;                
       
    constructor(private entityManagerProvider: EntityManagerProvider, private appLogger: AppLogger) {
        
        entityManagerProvider.initializeEntityManager()
            .then((em: breeze.EntityManager) => {
                this.entityManager = em;
                this.getFlexData();
            });
    }

    getFlexData() {

        let options = {
            columns: [
                { header: 'First Name', binding: 'FirstName', required: false },
                { header: 'Last Name', binding: 'LastName', required: false }
            ],
            autoGenerateColumns: false
        };


        var query = breeze.EntityQuery.from("Contacts");
        this.items = new BreezeCollectionView(
            this.entityManager, query, options, true, true);
    }

}
