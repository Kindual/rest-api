const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } = require('../../models/contacts');
const { HttpError } = require('../../helpers');
const { ContactShemas, FavoriteSchema } = require('../../schemas/Schemas');

const router = express.Router()

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
    const result = await getContactById(req.params.contactId);

    if (!result) {
      throw new HttpError(404, "Not found").returnError();
    }
    
    res.json(result);

  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = ContactShemas.validate(req.body);
    if (error) {
      throw new HttpError(400, `missing required name field: ${error.message}`).returnError();
    }
    const result = await addContact(req.body);;
    
    res.status(201).json(result);

  } catch (error) {
    next(error)
  }

})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    if (!result) {
      throw new HttpError(404, "Not found").returnError();
    }

    res.json(result)    
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = ContactShemas.validate(req.body);
    if (error) {
      throw new HttpError(400, "missing fields").returnError();
    }
    
    const result = await updateContact(req.params.contactId, req.body)
    if (!result) {
      throw new HttpError(404, "Not found").returnError();
    }
    res.json(result);
    
  } catch (error) {
    next(error)    
  }

})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { error } = FavoriteSchema.validate(req.body);
    if (error) {
      throw new HttpError(400, "missing field favorite").returnError();
    }
    
    const result = await updateStatusContact(req.params.contactId, req.body)
    if (!result) {
      throw new HttpError(404, "Not found").returnError();
    }
    res.json(result);
    
  } catch (error) {
    next(error)    
  }

})

module.exports = router
