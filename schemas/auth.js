const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).messages({
  "any.required": "missing fields",
});

const authEmailSchema = Joi.object({
  email: Joi.string().required(),
}).messages({
  "any.required": "missing required field email",
});

module.exports = {
  authSchema,
  authEmailSchema,
};
