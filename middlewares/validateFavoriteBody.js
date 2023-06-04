const { HttpError } = require("../helpers");
const { favoriteSchema } = require("../schemas/favorite");

const validateFavoriteBody = async (req, res, next) => {
  const { error } = favoriteSchema.validate(req.body);

  if (error) {
    next(new HttpError(400, error.message));
  }

  next();
};

module.exports = validateFavoriteBody;
