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
            this.logger.info("fetchingMetadata()");
            if (!this.initialized) {
                var value = yield this.masterManager.fetchMetadata();
                this.logger.info("fetchedMetadata()");
                this.initialized = true;
            }
            return this.createManager();
        });
    }
    getPredict(predictValue) {
        if (!predictValue || !predictValue.length) {
            return;
        }
        return new breeze.Predicate("CompanyName", "contains", predictValue);
    }
};
EntityManagerProvider = __decorate([
    inject(AppLogger)
], EntityManagerProvider);
//# sourceMappingURL=entity-manager-provider.js.map