import * as toastr from "toastr";

export class AppLogger {

    constructor() {
        toastr.options.timeOut = 2000; // 2 second toast timeout
        toastr.options.positionClass = 'toast-bottom-right';
    }

    error(message: string, title: string) {
        toastr.error(message, title);
        this.log("Error: " + message);
    }

    info(message: string, title: string) {
        toastr.info(message, title);
        this.log("Info: " + message);
    }

    success(message: string, title: string) {
        toastr.success(message, title);
        this.log("Success: " + message);
    }

    warning(message: string, title: string) {
        toastr.warning(message, title);
        this.log("Warning: " + message);
    }

    log(message: string) {
        console.log(message);
    }

}