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
import { EntityManagerProvider } from "resources/data/entity-manager-provider";
import errorHandler from "resources/core/error-handler";
var wijmo;
export let Welcome = class {
    constructor(entityManagerProvider) {
        this.heading = "Welcome";
        this.location = "FileRowMaps";
        this.entities = [];
        console.log("mapping-list cstr");
        console.log(entityManagerProvider.toString());
        //entityManagerProvider.initializeEntityManager()
        //    .then((em: breeze.EntityManager) => {
        //        this.entityManager = em;
        //        this.getFlexData();
        //    });
    }
    getInitialData() {
        return __awaiter(this, void 0, Promise, function* () {
            let query = new breeze.EntityQuery()
                .from('FileRowMaps');
            try {
                let queryResult = yield this.entityManager.executeQuery(query);
                this.entities = queryResult.results;
            }
            catch (error) {
                errorHandler.handleError(error, this.location);
            }
        });
    }
    getFlexData() {
        this.items = new wijmo.data.BreezeCollectionView(this.entityManager, this.entityManagerProvider.getEntityQuery("Contacts"), true, true);
        let item = null;
        var numberInput = null;
        this.items.currentChanged.addHandler(() => {
            item = this.items.currentItem;
        });
        this.items.collectionChanged.addHandler(() => {
            item = this.items.currentItem;
        });
        this.items.querySucceeded.addHandler((sender, e) => {
            if (numberInput) {
                numberInput.max = this.items.pageCount;
            }
            this.entityManagerProvider.querySucceeded(e.data);
        });
        this.items.queryFailed.addHandler((sender, e) => {
            this.entityManagerProvider.queryFailed(e.data.message);
        });
        this.items.saveSucceeded.addHandler((sender, e) => {
            this.entityManagerProvider.saveSucceeded(e.data);
        });
        this.items.saveFailed.addHandler((sender, e) => {
            this.entityManagerProvider.saveFailed(e.data, this.entityManager);
        });
    }
};
Welcome = __decorate([
    inject(EntityManagerProvider)
], Welcome);
//# sourceMappingURL=welcome.js.map