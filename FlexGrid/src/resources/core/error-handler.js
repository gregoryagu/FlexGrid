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
import { getLogger } from "aurelia-logging";
class ErrorHandler {
    constructor() {
        this.logger = getLogger("Error-Handler");
        this.logger.info("ErrorHandler has been created");
    }
    handleError(message, location) {
        this.logger.error(message);
        if (message.entityErrors) {
            message.entityErrors.forEach((entityError) => {
                this.logger.error(entityError.errorMessage);
                alert(entityError.errorMessage);
            });
        }
        else {
            var errorMessage = location + ":" + message;
            alert(errorMessage);
        }
    }
}
export default new ErrorHandler();
//# sourceMappingURL=error-handler.js.map