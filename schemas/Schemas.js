const Joi = require("joi");
const { default: mongoose, Schema } = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
})

const Contact = mongoose.model('Contact', contactSchema);

const ContactSchemas = Joi.object({
  name: Joi.string().required(),

  phone: Joi.string().min(5).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).required(),

  favorite: Joi.boolean(),
});

const FavoriteSchema = Joi.object({
  favorite: Joi.boolean().required("missing field favorite"),
})

module.exports = {
  ContactSchemas,
  FavoriteSchema,
  Contact,
}