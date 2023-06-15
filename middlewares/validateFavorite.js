const { HttpError } = require("../helpers");
const { FavoriteSchema } = require("../schemas/Schemas");


const isFavorite = (req, res, next) => {
    const {favorite} = req.params;
    if(!FavoriteSchema.validate(favorite)) {
        throw new HttpError(404, 'not')
    }
}