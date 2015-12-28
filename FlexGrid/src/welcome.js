var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from "aurelia-framework";
import { EntityManagerProvider } from "resources/data/entity-manager-provider";
import { AppLogger } from "resources/core/app-logger";
import { BreezeCollectionView } from "resources/data/BreezeCollectionView";
export let Welcome = class {
    constructor(entityManagerProvider, appLogger) {
        this.entityManagerProvider = entityManagerProvider;
        this.appLogger = appLogger;
        this.loggerTitle = "FileRowMaps";
        entityManagerProvider.initializeEntityManager()
            .then((em) => {
            this.entityManager = em;
            this.getFlexData();
        });
    }
    getFlexData() {
        this.items = new BreezeCollectionView(this.entityManager, this.entityManagerProvider.getEntityQuery("Contacts"), true, true);
        let item = null;
        var numberInput = null;
        //this.items.currentChanged.addHandler(() => {
        //    item = this.items.currentItem;
        //});
        //this.items.collectionChanged.addHandler(() => {
        //    item = this.items.currentItem;
        //});
        //this.items.querySucceeded.addHandler((sender: any, e: any) => {
        //    if (numberInput) {
        //        numberInput.max = this.items.pageCount;
        //    }
        //    this.entityManagerProvider.querySucceeded(e.data);
        //});
        //this.items.queryFailed.addHandler((sender: any, e: any) => {
        //    this.entityManagerProvider.queryFailed(e.data.message);
        //});
        //this.items.saveSucceeded.addHandler((sender: any, e: any) => {
        //    this.entityManagerProvider.saveSucceeded(e.data);
        //});
        //this.items.saveFailed.addHandler((sender: any, e: any) => {
        //    this.entityManagerProvider.saveFailed(e.data, this.entityManager);
        //});
    }
};
Welcome = __decorate([
    inject(EntityManagerProvider, AppLogger)
], Welcome);
//# sourceMappingURL=welcome.js.map