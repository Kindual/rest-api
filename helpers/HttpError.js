const HttpError = class {
    constructor(status, message) {
        this.error = new Error(message);
        this.error.status = status;
    }
    
    returnError() {
        return this.error
    }
}

module.exports = HttpError;

