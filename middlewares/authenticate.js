const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    const error = new Error();
    error.status = 401;
    next(error);
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    res.json(id);
  } catch (err) {
    next(err);
  }
};
module.exports = authenticate;
