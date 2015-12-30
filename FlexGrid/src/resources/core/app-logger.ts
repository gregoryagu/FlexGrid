import * as toastr from "toastr";

export class AppLogger {

    constructor() {
        toastr.options.timeOut = 2000; // 2 second toast timeout
        toastr.options.positionClass = 'toast-bottom-right';
    }

    error(message: string) {
        toastr.error(message, "Error");
        this.log("Error: " + message);
    }

    info(message: string) {
        toastr.info(message, "Info");
        this.log("Info: " + message);
    }

    success(message: string) {
        toastr.success(message, "Success");
        this.log("Success: " + message);
    }

    warning(message: string) {
        toastr.warning(message, "Warning");
        this.log("Warning: " + message);
    }

    log(message: string) {
        console.log(message);
    }



    querySucceeded(entityCount: number) {
        this.info("Fetched " + entityCount + " Entities ");
    }

    queryFailed(errorMsg: string) {
        this.error(errorMsg);
    }

    saveSucceeded(saveResult: any) {
        let message: string = "# of entities saved = " + saveResult.entities.length;
        this.success(message);
        this.log(message);
    }

    saveFailed(error: any) {
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
            
        }

        this.error("Failed to save changes. " + reason +
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
        this.error(message);
    }


}