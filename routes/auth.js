const express = require("express");

const AuthController = require("../controllers/auth");
const { authenticate, validateBody, upload } = require("../middlewares");
const { authSchema, authEmailSchema } = require("../schemas/auth");
const { subscriptionSchema } = require("../schemas/subscription");

const router = express.Router();

const jsonParser = express.json();

router.post(
  "/register",
  jsonParser,
  validateBody(authSchema),
  AuthController.register
);

// signup

router.get("/verify/:verificationToken", AuthController.verify);

router.post(
  "/verify",
  validateBody(authEmailSchema),
  AuthController.resendVerifyEmail
);

// signin

router.post(
  "/login",
  jsonParser,
  validateBody(authSchema),
  AuthController.login
);

router.get("/current", authenticate, AuthController.getCurrent);

router.get("/logout", authenticate, AuthController.logout);

router.patch(
  "/",
  authenticate,
  validateBody(subscriptionSchema),
  AuthController.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  AuthController.updateAvatar
);

module.exports = router;
