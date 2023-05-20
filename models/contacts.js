const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  console.log(data)
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contactIdString = contactId.toString();
  console.log(contactIdString)
  const contactById = contacts.find(
    contact => contact.id === contactIdString
  );

  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const contactsById = await getContactById(contactId);
  if (!contactsById) {
    return null;
  }

  const contacts = await listContacts();

  const contactIdString = contactId.toString();
  const newContactsList = contacts.filter(
    (contact) => contact.id !== contactIdString
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList), "utf8");
  return { "message": "contact deleted" };
}

async function addContact(body) {
  const { name, email, phone } = body;
  const contacts = await listContacts();

  const newContact = { id: nanoid(17), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");

  return newContact;
}

async function updateContact(contactId, body) {
  await removeContact(contactId);
  const contacts = await listContacts();

  const newContact = { id: contactId, ...body };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
