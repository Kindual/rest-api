const { HttpError } = require("../helpers");

const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            return next(new HttpError(422, result.error));
        }
        next();
    };
};

module.exports = validateBody;