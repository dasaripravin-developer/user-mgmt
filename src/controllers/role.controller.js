const { logger } = require("../logger/logger.js");
const { getAllRoles } = require("../services/role.service.js");
const utils = require("../utils/constant.utils.js");

async function getRoles(request, response) {
     try {
        console.log(request)
          logger.info(`controller - role - getRoles - `);
          const res = await getAllRoles();
          logger.info(`controller - role - getRoles - response - ${JSON.stringify(res)}`);
          response.status(200).json(res);
     } catch (err) {
          logger.error(`controller - role - getRoles - Exception - ${err}`);
          response.status(500).json({ message: err.message });
     }
}

module.exports = {
     getRoles,
};
