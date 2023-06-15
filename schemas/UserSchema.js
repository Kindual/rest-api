const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: '',
    }

}, {
    versionKey: false,
    timestamps: true,
}
)

const User = mongoose.model('User', UserSchema);

const userRegisterSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
})

const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
})

const schemas = {
    userRegisterSchema,
    userLoginSchema,
}

module.exports = { User, schemas }; 
