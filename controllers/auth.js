const bcrypt = require("bcrypt");
const User = require("../models/user");
const ctrlWrapper = require("../decorators/ctrlWrapper");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const contactsPath = path.resolve("public", "avatars");

const register = async (req, res, next) => {
  const avatarURL = gravatar.url(req.body.email);

  const user = {
    email: req.body.email,
    password: req.body.password,
    subscription: req.body.subscription,
    avatarURL,
  };

  const currentUser = await User.findOne({ email: user.email });
  if (currentUser !== null) {
    return res.status(409).json({ message: "Email in use" });
  }

  user.password = await bcrypt.hash(user.password, 10);
  await User.create(user);

  return res
    .status(201)
    .json({ user: { email: user.email, subscription: "starter" } });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(user);

  if (user === null) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch === false) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const { _id: id } = user;

  const payload = { id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(id, { token });
  return res.json({ token, user: { email, subscription: user.subscription } });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).end();
};

const updateSubscription = async (req, res) => {
  const { _id: id } = req.user;
  const { subscription } = req.body;

  await User.findByIdAndUpdate(id, { subscription });

  res.json({ message: "Subscription updated" });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newFilename = `${_id}_${filename}`;

  const newPath = path.join(contactsPath, newFilename);
  await fs.rename(oldPath, newPath);

  const image = await jimp.read(newPath);
  await image.resize(250, 250).write(newPath);

  const avatarURL = path.join("avatars", newFilename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
