const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    descriptions: Joi.string(),
    type: Joi.string(),
    address: Joi.string().allow(''),
    date: Joi.number().allow(''),
})

module.exports = schema