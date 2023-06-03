const { contactAddSchema } = require("../schemas/contacts-schemas");

const { HttpError } = require("../helpers");
const ctrlWrapper = require("../decorators/ctrlWrapper");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../service/DBOperations");

const getAll = async (req, res, next) => {
  const list = await getContacts();
  res.status(200).json(list);
};

const getOne = async (req, res, next) => {
  const contact = await getContactById(req.params.id);
  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(contact);
};

const addOne = async (req, res, next) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, error.message);
  }
  const data = req.body;
  const newContact = await addContact(data);

  res.status(201).json(newContact);
};

const removeOne = async (req, res, next) => {
  const deletedContact = await removeContact(req.params.id);

  if (!deletedContact) {
    throw new HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateOne = async (req, res, next) => {
  if (JSON.stringify(req.body) === "{}") {
    throw new HttpError(400, "missing fields");
  }

  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw new HttpError(400, error.message);
  }

  const updatedContact = await updateContact(req.params.id, req.body);

  if (!updatedContact) {
    throw new HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getOne: ctrlWrapper(getOne),
  addOne: ctrlWrapper(addOne),
  removeOne: ctrlWrapper(removeOne),
  updateOne: ctrlWrapper(updateOne),
};
