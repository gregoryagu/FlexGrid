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
import * as toastr from "toastr";
export class AppLogger {
    constructor() {
        toastr.options.timeOut = 2000; // 2 second toast timeout
        toastr.options.positionClass = 'toast-bottom-right';
    }
    error(message, title) {
        toastr.error(message, title);
        this.log("Error: " + message);
    }
    info(message, title) {
        toastr.info(message, title);
        this.log("Info: " + message);
    }
    success(message, title) {
        toastr.success(message, title);
        this.log("Success: " + message);
    }
    warning(message, title) {
        toastr.warning(message, title);
        this.log("Warning: " + message);
    }
    log(message) {
        console.log(message);
    }
}
//# sourceMappingURL=app-logger.js.map