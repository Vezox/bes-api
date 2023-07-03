
const Joi = require('joi');

const schema = Joi.object({
  full_name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string(),
  object: Joi.string(),
  targets: Joi.array().items(Joi.string()),
  address: Joi.string(),
})

module.exports = schema