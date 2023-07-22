const joiValidation = require('../../../server/middleware/validator')
const Joi = require('joi');

async function login(request, response, next) {
    const joiSchema = {
        body: Joi.object({
            username: Joi.string().required()
        }),
    };
    await joiValidation(request, response, joiSchema, next);
}

module.exports = {
    login
};