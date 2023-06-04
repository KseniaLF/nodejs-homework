const bcrypt = require("bcrypt");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const currentUser = await User.findOne({ email: user.email });

    if (currentUser !== null) {
      return res.status(409).json({ message: "User already exists" });
    }

    user.password = await bcrypt.hash(user.password, 10);

    await User.create(user);
    return res.status(201).end();
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user === null) {
      return res
        .status(401)
        .json({ message: "Email or password is incorerect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      return res
        .status(401)
        .json({ message: "Email or password is incorerect" });
    }

    const { _id: id } = user;

    const payload = { id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    console.log(token);

    return res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
