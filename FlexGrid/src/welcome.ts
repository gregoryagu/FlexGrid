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
                       
    constructor(private entityManagerProvider: EntityManagerProvider, private appLogger: AppLogger) {
        
        entityManagerProvider.initializeEntityManager()
            .then((em: breeze.EntityManager) => {
                this.entityManager = em;
                this.getFlexData();
            });
    }

    

    getFlexData() {


        this.items = new BreezeCollectionView(
            this.entityManager, this.entityManagerProvider.getEntityQuery("Contacts"), true, true);
        let item: any = null;
        var numberInput: any = null;
        this.items.currentChanged.addHandler(() => {
            item = this.items.currentItem;
        });

        this.items.collectionChanged.addHandler(() => {
            item = this.items.currentItem;
        });

        


    }

}
