const bcrypt = require('bcrypt')
const { HttpError, sendEmail, ctrlWrapper } = require("../helpers");
const jwt = require('jsonwebtoken');
const { User } = require('../schemas');
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars')

async function register(req, res, next) {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    const currentUser = await User.findOne({ email: newUser.email });

    if (currentUser) {
        throw new HttpError(409, "Email in use").returnError();
    }

    newUser.password = await bcrypt.hash(newUser.password, 10);
    const avatarURL = gravatar.url(newUser.email);
    const verificationToken = nanoid();


    await User.create({ ...newUser, avatarURL, verificationToken });

    const verifyEmail = {
        to: newUser.email,
        subject: 'verify email',
        html: `<a target='_blank' href='${BASE_URL}/api/auth/verify/${verificationToken}'>Click verify email</a>`,
    }

    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: "starter"
        }
    })
}

async function login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
        throw new HttpError(401, "Email or password is wrong").returnError();
    }

    if (!user.verify) {
        throw new HttpError(401, "Email not verified").returnError();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new HttpError(401, "Email or password is wrong").returnError();
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
}

async function verifyEmail(req, res, next) {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    console.log(user)

    if (user === null) {
        throw new HttpError(401, 'User not found').returnError();
    }

    console.log(11)
    const test = await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null }, { new: true })
    console.log(test);

    res.json({
        message: 'Verification successful'
    })
}

async function resendVerifyEmail(req, res, next) {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new HttpError(401, "Email not found").returnError();
    }
    if (user.verify) {
        throw new HttpError(400, "Verification has already been passed").returnError();
    }

    const verifyEmail = {
        to: user.email,
        subject: 'verify email',
        html: `<a target='_blank' href='${BASE_URL}/api/auth/verify/${user.verificationToken}'>Click verify email</a>`,
    }

    await sendEmail(verifyEmail);

    res.json({
        message: 'Verify email send success',
    })
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

async function updateAvatar(req, res, next) {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL,
    })
}

module.exports = {
    register: ctrlWrapper(register),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
}