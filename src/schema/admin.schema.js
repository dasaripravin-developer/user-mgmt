const Joi = require("joi");

const assignRole = Joi.object({
     userId: Joi.number().required(),
     roleId: Joi.number().required(),
});

module.exports = {
     assignRole,
};
