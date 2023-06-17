const { HttpError, ctrlWrapper } = require("../helpers");
const { Contact } = require("../schemas");

async function listContacts(req, res, next) {
  const { id } = req.user;
  const result = await Contact.find({ owner: id });
  res.json(result)
}

async function getContactById(req, res, next) {
  const { _id } = req.user;
  const result = await Contact.findOne({ _id: req.params.contactId, owner: _id })

  if (!result) {
    throw new HttpError(404, "Not found");
  }

  res.json(result);
}

async function removeContact(req, res, next) {
  const { _id } = req.user;
  const result = await Contact.findOneAndDelete({ _id: req.params.contactId, owner: _id })
  if (!result) {
    return { "message": "contact not found" };
  }

  res.json({ "message": "contact deleted" })
}

async function addContact(req, res, next) {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner })
  res.status(201).json(result);
}

async function updateContact(req, res, next) {
  const { _id } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: req.params.contactId, owner: _id }, req.body, { new: true });
  
  if (!result) {
    throw new HttpError(404, "Not found");
  }

  res.json(result);
}

async function updateStatusContact(req, res, next) {
  const { _id } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: req.params.contactId, owner: _id }, {favorite: req.body.favorite}, { new: true });
  
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  
  res.json(result);
}

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
}
