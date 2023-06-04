const { HttpError } = require("../helpers");
const { contactAddSchema } = require("../schemas/contacts-schemas");

const validateContactBody = async (req, res, next) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    next(new HttpError(400, error.message));
  }

  next();
};

module.exports = validateContactBody;
