const express = require("express");
const router = express.Router();

const moviesController = require("../../controllers/contacts-controllers");

router.get("/", moviesController.getAll);

router.get("/:id", moviesController.getOne);

router.post("/", moviesController.addOne);

router.delete("/:id", moviesController.removeOne);

router.put("/:id", moviesController.updateOne);

module.exports = router;
