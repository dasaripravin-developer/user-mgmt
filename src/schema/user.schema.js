const Joi = require("joi");

const register = Joi.object({
     firstName: Joi.string().min(1).max(10).required(),
     lastName: Joi.string().min(1).max(10).required(),
     email: Joi.string().email().required(),
     phone: Joi.string().min(10).max(10).required(),
     password: Joi.string().min(8).max(16).required(),
});

const login = Joi.object({
     email: Joi.string().email().required(),
     password: Joi.string().required(),
});

const updateData = Joi.object({
     firstName: Joi.string().min(1).max(10).optional(),
     lastName: Joi.string().min(1).max(10).optional(),
     phone: Joi.string().min(10).max(10).optional(),
     isActive: Joi.boolean().optional()
});

const filterSchema = Joi.object({
     firstName: Joi.string().optional(),
     lastName: Joi.string().optional(),
     email: Joi.string().email().optional(),
     phone: Joi.string().optional(),
     roleId: Joi.number().optional(),
});

module.exports = {
     register,
     login,
     updateData,
     filterSchema,
};
