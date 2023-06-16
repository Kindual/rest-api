const express = require('express')
const { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } = require('../../controllers/contacts');
const { authenticate } = require('../../middlewares');
const validateBody = require('../../middlewares/validateBody');
const { schemas } = require('../../schemas');

const router = express.Router()
 
router.use(authenticate)

router.get('/', listContacts)
router.get('/:contactId', getContactById)
router.post('/', validateBody(schemas.contactBodySchema), addContact)
router.delete('/:contactId', removeContact)
router.put('/:contactId', validateBody(schemas.contactBodySchema), updateContact)
router.patch('/:contactId/favorite', validateBody(schemas.contactFavoriteSchema), updateStatusContact)

module.exports = router
