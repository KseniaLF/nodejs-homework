const { HttpError } = require("../helpers");
const ctrlWrapper = require("../decorators/ctrlWrapper");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
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
  const updatedContact = await updateContact(req.params.id, req.body);

  if (!updatedContact) {
    throw new HttpError(404, "Not found");
  }
  res.json(updatedContact);
};

const makeFavorite = async (req, res, next) => {
  const updatedContact = await updateStatusContact(req.params.id, req.body);

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
  makeFavorite: ctrlWrapper(makeFavorite),
};
