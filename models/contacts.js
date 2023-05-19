const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    console.log(data)
    return JSON.parce(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();

    const contactIdString = contactId.toString();
    const contactById = contacts.find(
      (contact) => contact.id === contactIdString
    );

    if (!contactById) {
      return null;
    }
    return JSON.parce(contactById);
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
    return {"message": "contact deleted"};
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();

    const newContact = { id: nanoid(17), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");

    return JSON.parse(newContact);
}

async function updateContact(contactId, body) {
    removeContact(contactId);
    const contacts = await listContacts();

    const newContact = { id: contactId, ...body };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    return JSON.parce(newContact);
} 

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
