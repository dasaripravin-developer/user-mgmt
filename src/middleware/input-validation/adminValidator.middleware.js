const { assignRole } = require("../../schema/admin.schema.js");

async function assginRoleValidator(request, response, next) {
     const { error } = assignRole.validate(request.body);
     if (error) return response.status(400).send(error.message);
     else next();
}

module.exports = {
     assginRoleValidator,
};
