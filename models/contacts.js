const fs = require("fs").promises;
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const removeContact = async (id) => {
  const contact = await getContactById(id);

  const contacts = await listContacts();
  const newArr = contacts.filter((contact) => contact.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(newArr, null, 2));

  return contact || null;
};

const updateContact = async (id, body) => {
  const contact = await getContactById(id);

  if (!contact) {
    return null;
  }

  const updatedContact = { ...contact, ...body };

  const contacts = await listContacts();
  const newArr = contacts.map((contact) => {
    if (contact.id === id) {
      return updatedContact;
    }
    return contact;
  });

  await fs.writeFile(contactsPath, JSON.stringify(newArr, null, 2));

  return updatedContact || null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
