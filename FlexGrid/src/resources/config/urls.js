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
/**
* Global settings/constants
*/
let urlsForDevelopement = {
    serviceName: "http://localhost:9000/breeze/data"
};
let urlsForProduction = {
    serviceName: "http://iisprod/edimetadata/breeze/data"
};
var Urls;
if (window.location.hostname === 'localhost') {
    Urls = urlsForDevelopement;
}
else {
    Urls = urlsForProduction;
}
export default Urls;
//# sourceMappingURL=urls.js.map