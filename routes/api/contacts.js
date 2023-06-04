const express = require("express");
const router = express.Router();

const { contactsController } = require("../../controllers");
const {
  validateContactBody,
  validateFavoriteBody,
} = require("../../middlewares");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getOne);

router.post("/", validateContactBody, contactsController.addOne);

router.delete("/:id", contactsController.removeOne);

router.put("/:id", validateContactBody, contactsController.updateOne);

router.patch(
  "/:id/favorite",
  validateFavoriteBody,
  contactsController.makeFavorite
);

module.exports = router;
