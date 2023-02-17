const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

const getContactId = (parsedData) => {
  const contactId = parsedData.map((contact) => {
    return Number(contact.id);
  });
  const nextId = Math.max(...contactId) + 1;
  return String(nextId);
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const foundContact = contacts.find(
      (contact) => Number(contact.id) === contactId
    );
    return foundContact || null;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: getContactId(contacts),
      name,
      email,
      phone,
    };
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
    console.log(`Contact was added`);
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter((contact) => {
      if (Number(contact.id) !== contactId) {
        return contact;
      }
    });
    fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), "utf8");
    console.log(`Contact was removed`);
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
