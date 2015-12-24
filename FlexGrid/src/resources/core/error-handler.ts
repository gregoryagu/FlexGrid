import {Logger, getLogger} from "aurelia-logging";
import {HttpResponseMessage} from "aurelia-http-client";
import EntityError = breeze.EntityError;

class ErrorHandler {

    constructor() {
        this.logger.info("ErrorHandler has been created");
    }

    logger: Logger = getLogger("Error-Handler");
    handleError(message: any, location: string): void {
        this.logger.error(message);
        if (message.entityErrors) {
            message.entityErrors.forEach((entityError: EntityError) => {
                this.logger.error(entityError.errorMessage);
                alert(entityError.errorMessage);
            });
        } else {
            var errorMessage = location + ":" + message;

            alert(errorMessage);
        }


    }


}

export default new ErrorHandler();