const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const Joi = require('joi');

const router = express.Router()

const addSchema = Joi.object({
  // id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await getContactById(req.id);

    if (!result) {
      throw HttpError(404, "Not found")
    }

    res.json(result);

  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const result = await addContact(req.body);;
    
    res.status(201).json(result);

  } catch (error) {
    next(error)
  }

})

router.delete('/:contactId', async (req, res, next) => {
  res.status(200).json(JSON.parce(removeContact(req.id)))
})

router.put('/:contactId', async (req, res, next) => {
  res.json(JSON.parce(updateContact(req.id, req.body)))
})

module.exports = router
