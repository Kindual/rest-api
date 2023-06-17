class HttpError {
    constructor(status, message) {
        this.message = message;
        this.name = "Error";
        this.status = status;
    }
}

module.exports = HttpError;

