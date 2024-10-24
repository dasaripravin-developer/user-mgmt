const { register, login, updateData, filterSchema } = require("../../schema/user.schema.js");

async function registerValidator(request, response, next) {
     const { error } = register.validate(request.body);
     if (error) return response.status(400).send(error.message);
     else next();
}

async function loginValidator(request, response, next) {
     const { error } = login.validate(request.body);
     if (error) return response.status(400).send(error.message);
     else next();
}

async function userParamsValidator(request, response, next) {
     if (Object.is(Number(request.params.id), NaN)) {
          return response.status(404).send();
     }
     next();
}

async function updateDataValidator(request, response, next) {
     const { error } = updateData.validate(request.body);
     if (error) return response.status(400).send(error.message);
     else next();
}

async function filterValidator(request, response, next) {
     const { error } = filterSchema.validate(request.body);
     if (error) return response.status(400).send(error.message);
     else next();
}

module.exports = {
     registerValidator,
     loginValidator,
     userParamsValidator,
     updateDataValidator,
     filterValidator,
};
