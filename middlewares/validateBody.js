const { HttpError } = require("../helpers");
const { ContactSchemas } = require("../schemas/Schemas");


const isValideBody = (req, res, next) => {
    const body = req.params.body;
    if(!ContactSchemas.validate(body)) {
        throw new HttpError(404, 'not valide')
    }
}

module.exports = isValideBody;