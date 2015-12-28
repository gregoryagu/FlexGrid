var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
import { inject } from "aurelia-framework";
import Urls from "resources/config/urls";
import { AppLogger } from "resources/core/app-logger";
export let EntityManagerProvider = class {
    constructor(logger) {
        this.logger = logger;
        this.loggerTitle = "EntityManagerProvider";
        //This must be done before creating entity Manager.
        //let NamingConvention = breeze.NamingConvention; // for convenience
        //NamingConvention.camelCase.setAsDefault();
        this.masterManager = new breeze.EntityManager(Urls.serviceName);
        let store = this.masterManager.metadataStore;
    }
    createManager() {
        return this.masterManager.createEmptyCopy(); // same configuration; no entities in cache.
    }
    initializeEntityManager() {
        return __awaiter(this, void 0, Promise, function* () {
            this.logger.info("fetchingMetadata()", this.loggerTitle);
            if (!this.initialized) {
                var value = yield this.masterManager.fetchMetadata();
                this.logger.info("fetchedMetadata()", this.loggerTitle);
                this.initialized = true;
            }
            return this.createManager();
        });
    }
    /////New Code
    getEntityQuery(tableName) {
        return breeze.EntityQuery.from(tableName);
    }
    querySucceeded(entityCount) {
        this.logger.info("Fetched " + entityCount + " Entities ", this.loggerTitle);
    }
    queryFailed(errorMsg) {
        this.logger.error(errorMsg, "Query failed");
    }
    saveSucceeded(saveResult) {
        let message = "# of entities saved = " + saveResult.entities.length;
        this.logger.success(message, this.loggerTitle);
        this.logger.log(message);
    }
    getPredict(predictValue) {
        if (!predictValue || !predictValue.length) {
            return;
        }
        return new breeze.Predicate("CompanyName", "contains", predictValue);
    }
    saveFailed(error, manager) {
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
        this.logger.error(error, "Failed to save changes. " + reason +
            " You may have to restart the app.");
    }
    handleSaveValidationError(entityErrors) {
        let message = "Not saved due to validation errors";
        try {
            // fish out the first error
            var messages = entityErrors.map(function (er) {
                return er.errorMessage;
            });
            message += ": " + messages.join(';\n');
        }
        catch (e) {
        }
        this.logger.error(message, this.loggerTitle);
    }
};
EntityManagerProvider = __decorate([
    inject(AppLogger)
], EntityManagerProvider);
//# sourceMappingURL=entity-manager-provider.js.map