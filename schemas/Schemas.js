const Joi = require("joi");
const { default: mongoose } = require("mongoose");

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
  }
})

const Contact = mongoose.model('Contact', contactSchema);

const ContactShemas = Joi.object({
  name: Joi.string().required(),

  phone: Joi.string().min(5).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).required(),
});

const FavoriteSchema = Joi.object({
  favorite: Joi.boolean().required("missing field favorite"),
})

module.exports = {
  ContactShemas,
  Contact,
  FavoriteSchema,
}