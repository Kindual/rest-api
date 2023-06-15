const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { User } = require('../schemas/UserSchema');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
        next(new HttpError(401, "Not authorized").returnError())
    }

    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            next(new HttpError(401, "Not authorized").returnError())
        }
        req.user = user;
        next();
    } catch (error) {
        next(error)
    }

}

module.exports = authenticate;