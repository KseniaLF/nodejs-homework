const express = require("express");
const router = express.Router();

const { contactsController } = require("../../controllers");
const {
  validateContactBody,
  validateFavoriteBody,
} = require("../../middlewares");
const authenticate = require("../../middlewares/authenticate");

router.use(authenticate);

router.get("/", contactsController.getContacts);

router.get("/:id", contactsController.getContactById);

router.post("/", validateContactBody, contactsController.addContact);

router.delete("/:id", contactsController.removeContact);

router.put("/:id", validateContactBody, contactsController.updateContact);

router.patch(
  "/:id/favorite",
  validateFavoriteBody,
  contactsController.updateStatusContact
);

module.exports = router;
