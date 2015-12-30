import {autoinject, inject} from "aurelia-framework";
import Urls from "resources/config/urls";
import EntityManager = breeze.EntityManager;
import {AppLogger} from "resources/core/app-logger";
import * as toastr from "toastr";

@inject(AppLogger)
export class EntityManagerProvider {

    masterManager: breeze.EntityManager;

    constructor(private logger: AppLogger) {
        //This must be done before creating entity Manager.
        //let NamingConvention = breeze.NamingConvention; // for convenience
        //NamingConvention.camelCase.setAsDefault();
        this.masterManager = new breeze.EntityManager(Urls.serviceName);
        let store = this.masterManager.metadataStore;
    }

    createManager(): EntityManager {
        return this.masterManager.createEmptyCopy(); // same configuration; no entities in cache.
    }

    initialized: boolean;

    loggerTitle: string = "EntityManagerProvider";

    async initializeEntityManager(): Promise<EntityManager> {
        this.logger.info("fetchingMetadata()");

        if (!this.initialized) {
            var value = await this.masterManager.fetchMetadata();
            this.logger.info("fetchedMetadata()");
            this.initialized = true;
        }
        return this.createManager();

    }


    

    

    getPredict(predictValue: any) {
        if (!predictValue || !predictValue.length) {
            return;
        }
        return new breeze.Predicate("CompanyName", "contains", predictValue);
    }


    

    
}