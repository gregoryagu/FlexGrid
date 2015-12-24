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
        var console = window.console;
        !!console && console.log && console.log.apply && console.log.apply(console, message);
    }
}
//# sourceMappingURL=app-logger.js.map