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
        var entityQuery = breeze.EntityQuery.from("Contacts");

        let flexGridOptions = {
            columns: [
                { header: 'First Name', binding: 'FirstName', required: false },
                { header: 'Last Name', binding: 'LastName', required: false }
            ],
            autoGenerateColumns: false,
            allowAddNew: true
        };

        let collectionViewOptions = {
            entityQuery: entityQuery,
            entityManager: this.entityManager,
            entityType: "Contact"
        };

        
        this.items = new BreezeCollectionView(collectionViewOptions, flexGridOptions);
    }

}
