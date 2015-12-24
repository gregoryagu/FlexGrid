import {autoinject, inject, singleton} from "aurelia-framework";
import {EntityManagerProvider} from "resources/data/entity-manager-provider";
import errorHandler from "resources/core/error-handler";
var wijmo: any;

@inject(EntityManagerProvider)
export class Welcome {
    heading: string = "Welcome";

    location: string = "FileRowMaps";
    entities: any[] = [];

    entityManager: breeze.EntityManager;
    constructor(private entityManagerProvider: EntityManagerProvider) {
        console.log("mapping-list cstr");
        console.log(entityManagerProvider.toString());
        entityManagerProvider.initializeEntityManager()
            .then((em: breeze.EntityManager) => {
                this.entityManager = em;
                this.getFlexData();
            });
    }

    async getInitialData() {
        let query = new breeze.EntityQuery()
            .from('FileRowMaps');

        try {
            let queryResult = await this.entityManager.executeQuery(query);
            this.entities = queryResult.results;


        } catch (error) {

            errorHandler.handleError(error, this.location);
        }
    }

    items: any;

    getFlexData() {


        this.items = new wijmo.data.BreezeCollectionView(
            this.entityManager, this.entityManagerProvider.getEntityQuery("Contacts"), true, true);
        let item: any = null;
        var numberInput: any = null;
        this.items.currentChanged.addHandler(() => {
            item = this.items.currentItem;
        });

        this.items.collectionChanged.addHandler(() => {
            item = this.items.currentItem;
        });

        this.items.querySucceeded.addHandler((sender: any, e: any) => {
            if (numberInput) {
                numberInput.max = this.items.pageCount;
            }
            this.entityManagerProvider.querySucceeded(e.data);
        });

        this.items.queryFailed.addHandler((sender: any, e: any) => {
            this.entityManagerProvider.queryFailed(e.data.message);
        });

        this.items.saveSucceeded.addHandler((sender: any, e: any) => {
            this.entityManagerProvider.saveSucceeded(e.data);
        });

        this.items.saveFailed.addHandler((sender: any, e: any) => {
            this.entityManagerProvider.saveFailed(e.data, this.entityManager);
        });


    }

}
