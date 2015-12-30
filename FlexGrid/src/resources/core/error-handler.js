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