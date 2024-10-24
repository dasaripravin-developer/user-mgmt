const { logger } = require("../logger/logger.js");
const { db } = require("../db/models/index.js");
const { Roles } = db;

async function getAllRoles() {
     return new Promise(async (resolve, reject) => {
          try {
               logger.info(`services - role - getAllRoles - `);
               const result = await Roles.findAll({});
               if (!result) {
                    return resolve({
                         message: `roles not found`,
                    });
               }
               resolve(result);
          } catch (err) {
               logger.error(`services - role - getAllRoles - Exception - ${err}`);
               reject(err);
          }
     });
}

module.exports = {
     getAllRoles,
};
