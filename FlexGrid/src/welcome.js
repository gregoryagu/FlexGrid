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
import errorHandler from "resources/core/error-handler";
var wijmo;
export class Welcome {
    constructor(entityManagerProvider, element) {
        this.entityManagerProvider = entityManagerProvider;
        this.element = element;
        this.heading = "Welcome";
        this.location = "FileRowMaps";
        this.entities = [];
        console.log("mapping-list cstr");
        console.log(entityManagerProvider.toString());
        console.log(element.toString());
        entityManagerProvider.initializeEntityManager()
            .then((em) => {
            this.entityManager = em;
            this.getFlexData();
        });
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
    attached() {
        console.log("attached");
        let flex = new wijmo.grid.FlexGrid(this.element);
        flex.initialize({
            itemsSource: this.items
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
}
//# sourceMappingURL=welcome.js.map