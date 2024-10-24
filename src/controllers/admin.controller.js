const { logger } = require("../logger/logger.js");
const { assignRole } = require("../services/admin.service.js");
async function assignRoleController(request, response) {
     try {
          logger.info(`controller - admin - assingRoleController - `);
          response.status(200).json(await assignRole(request.body));
     } catch (error) {
          logger.error(`controller - admin - assingRoleController - Exception - ${error}`);
          response.status(500).json({ message: error.message });
     }
}

module.exports = {
     assignRoleController,
};
