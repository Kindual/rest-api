const { Contact } = require("../schemas");

async function listContacts(id) {
  const data = await Contact.find({ owner: id });
  return data;
}

async function getContactById(contactId, owner) {
  const data = await Contact.findOne({ _id: contactId, owner })

  if (!data) {
    return null;
  }

  return data;
}

async function removeContact(contactId, owner) {
  const data = await Contact.findOneAndDelete({ _id: contactId, owner })

  if (!data) {
    return { "message": "contact not found" };
  }

  return { "message": "contact deleted" };
}

async function addContact(body) {
  const newContact = Contact.create({ ...body })
  return newContact;
}

async function updateContact(contactId, body, owner) {
  const data = await Contact.findOneAndUpdate({ _id: contactId, owner }, body, { new: true });

  return data;
}

async function updateStatusContact(contactId, body, owner) {
  const data = await Contact.findOneAndUpdate({ _id: contactId, owner }, { favorite: body.favorite }, { new: true });

  return data;
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
