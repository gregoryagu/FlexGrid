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
        this.logger.info("Constructor", this.loggerTitle);
        this.masterManager = new breeze.EntityManager(Urls.serviceName);
        let store = this.masterManager.metadataStore;
    }

    createManager(): EntityManager {
        return this.masterManager.createEmptyCopy(); // same configuration; no entities in cache.
    }

    initialized: boolean;

    loggerTitle: string = "EntityManagerProvider";

    async initializeEntityManager(): Promise<EntityManager> {
        this.logger.info("fetchingMetadata()", this.loggerTitle);

        if (!this.initialized) {
            var value = await this.masterManager.fetchMetadata();
            this.logger.info("fetchedMetadata()", this.loggerTitle);
            this.initialized = true;
        }
        return this.createManager();

    }


    /////New Code
    getEntityQuery(tableName: string) {
        return breeze.EntityQuery.from(tableName);
    }

    querySucceeded(entityCount: number) {
        this.logger.info("Fetched " + entityCount + " Entities ", this.loggerTitle);
    }

    queryFailed(errorMsg: string) {
        this.logger.error(errorMsg, "Query failed");
    }

    saveSucceeded(saveResult: any) {
        let message: string = "# of entities saved = " + saveResult.entities.length;
        this.logger.success(message, this.loggerTitle);
        this.logger.log(message);
    }

    getPredict(predictValue: any) {
        if (!predictValue || !predictValue.length) {
            return;
        }
        return new breeze.Predicate("CompanyName", "contains", predictValue);
    }


    saveFailed(error: any, manager: any) {
        let reason = error.message;
        let detail = error.detail;
        let entityErrors = error.entityErrors;

        if (entityErrors && entityErrors.length) {
            this.handleSaveValidationError(entityErrors);
            return;
        }
        if (detail && detail.ExceptionType &&
            detail.ExceptionType.indexOf('OptimisticConcurrencyException') !== -1) {
            // Concurrency error
            reason =
                "Another user, perhaps the server, may have deleted one or all of the same entities.";
            manager.rejectChanges(); // DEMO ONLY: discard all pending changes
        }

        this.logger.error(error,
            "Failed to save changes. " + reason +
            " You may have to restart the app.");
    }

    handleSaveValidationError(entityErrors: any) {
        let message = "Not saved due to validation errors";
        try {
            // fish out the first error
            var messages = entityErrors.map(function (er: any) {
                return er.errorMessage;
            });
            message += ": " + messages.join(';\n');
        } catch (e) { /* eat it for now */
        }
        this.logger.error(message, this.loggerTitle);
    }
}