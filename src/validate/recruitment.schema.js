
const Joi = require('joi');

const schema = Joi.object({
  full_name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email(),
  current_salary: Joi.string().allow('').optional(),
  expected_salary: Joi.string().allow('').optional(),
  file: Joi.string().required(),
})

module.exports = schema