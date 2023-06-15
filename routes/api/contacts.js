const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } = require('../../controllers/contacts');
const { HttpError } = require('../../helpers');
const { ContactSchemas, FavoriteSchema } = require('../../schemas/Schemas');
const { authenticate } = require('../../middlewares');

const router = express.Router()

router.use(authenticate)

router.get('/', async (req, res, next) => {
  try {
    const { id } = req.user;
    const result = await listContacts(id);
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { _id } = req.user;
    console.log(_id)

    const result = await getContactById(req.params.contactId, _id);

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
    const { _id: owner } = req.user;

    const { error } = ContactSchemas.validate(req.body);
    if (error) {
      throw new HttpError(400, `Nee missing required name field: ${error.message}`).returnError();
    }
    const result = await addContact({ ...req.body, owner });
    console.log(result)

    res.status(201).json(result);

  } catch (error) {
    next(error)
  }

})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await removeContact(req.params.contactId, _id);
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
    const { error } = ContactSchemas.validate(req.body);
    if (error) {
      throw new HttpError(400, "missing fields").returnError();
    }
    const { _id } = req.user;

    const result = await updateContact(req.params.contactId, req.body, _id)
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

    const { _id } = req.user;

    const result = await updateStatusContact(req.params.contactId, req.body, _id)
    if (!result) {
      throw new HttpError(404, "Not found").returnError();
    }
    res.json(result);

  } catch (error) {
    next(error)
  }
})

module.exports = router
