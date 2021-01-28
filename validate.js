const Joi = require('joi');

// Register Validation
const registerValidation = (data) => {
    const regSchema = Joi.object({
        username: Joi.string().min(8).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });

    return regSchema.validate(data);

};

// Login validation
const loginValidation = (data) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });

    return loginSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation; 