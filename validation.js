// Ensures only valid input data is added to the database

const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required(),
    });
    return schema.validate(data)

}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required()
    });
    return schema.validate(data)

}

const reserveValidation = (data) => {
    const schema = Joi.object({
        seatNumber: Joi.number() .min(1) .max(40),
        passengerPhone: Joi.number(),
        passengerName: Joi.string() .min(6) .max(50),
        passengerAge: Joi.number() .min(18) .max(150)
    });
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.reserveValidation = reserveValidation;