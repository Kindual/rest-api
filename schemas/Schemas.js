const Joi = require("joi");

const contactBodySchema = Joi.object({
    name: Joi.string().required(),

    phone: Joi.string().min(5).max(30).required(),

    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }).required(),

    favorite: Joi.boolean(),
});

const contactFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required("missing field favorite"),
})

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
    contactBodySchema,
    contactFavoriteSchema,
    
    userRegisterSchema,
    userLoginSchema,
}

module.exports = schemas;