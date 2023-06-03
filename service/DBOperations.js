const Contact = require("./schemas/contact");

const getContacts = async () => {
  return Contact.find();
};

const getContactById = async (id) => {
  return Contact.findOne({ _id: id });
};

const addContact = async (data) => {
  return Contact.create(data);
};

const removeContact = async (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const updateContact = async (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
