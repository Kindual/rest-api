const { Contact } = require("../schemas/Schemas");

async function listContacts() {
  const data = await Contact.find();
  return data;
}

async function getContactById(contactId) {
  const data = await Contact.findById(contactId)

  if (!data) {
    return null;
  }

  return data;
}

async function removeContact(contactId) {
  const data = await Contact.findByIdAndDelete(contactId)

  if (!data) {
    return { "message": "contact not found" };
  }

  return { "message": "contact deleted" };
}

async function addContact(body) {
  const { name, email, phone } = body;
  
  const newContact = Contact.create({ name, email, phone })
  return newContact;
}

async function updateContact(contactId, body) {
  const data = await Contact.findByIdAndUpdate(contactId, body, {new: true});

  return data;
}

async function updateStatusContact (contactId, body) {
  const data = await Contact.findByIdAndUpdate(contactId, {favorite: body.favorite}, {new: true});

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
