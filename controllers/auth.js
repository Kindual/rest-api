const bcrypt = require('bcrypt')
const { HttpError } = require("../helpers");
const jwt = require('jsonwebtoken');
const { User } = require('../schemas');

const { SECRET_KEY } = process.env;

async function register(req, res, next) {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    try {
        const currentUser = await User.findOne({ email: newUser.email });

        if (currentUser) {
            throw new HttpError(409, "Email in use").returnError();
        }

        newUser.password = await bcrypt.hash(newUser.password, 10);

        await User.create(newUser)

        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: "starter"
            }
        })
    } catch (error) {
        return next(error)
    }
}

async function login(req, res, next) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            throw new HttpError(401, "Email or password is wrong").returnError;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new HttpError(401, "Email or password is wrong").returnError;

        }

        const { _id: id } = user;

        const payload = {
            id,
        }

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
        await User.findByIdAndUpdate(id, { token });

        res.json({
            token, user: {
                email: user.email,
                subscription: "starter"
            }
        })
    } catch (error) {
        return next(error)
    }
}

async function getCurrent(req, res, next) {
    const { email } = req.user;
    res.json({
        user: {
            email,
            subscription: "starter"
        }
    })
}

async function logout(req, res, next) {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: '' })

    res.status(204).json({ message: 'Logout success' })
}

module.exports = { register, login, getCurrent, logout }