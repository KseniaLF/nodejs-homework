const express = require("express");

const AuthController = require("../controllers/auth");
// const { authenticate } = require("../middlewares");

const router = express.Router();

const jsonParser = express.json();

router.post("/register", jsonParser, AuthController.register);

router.post("/login", jsonParser, AuthController.login);

// router.get("/123", authenticate, (req, res) => {
//   res.json("XXXX");
// });

module.exports = router;
