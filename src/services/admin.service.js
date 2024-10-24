const { logger } = require("../logger/logger.js");
const { db } = require("../db/models/index.js");
const { User } = db;
const DEFAULT_ROLE = require("../utils/constant.utils.js").defaultRole;

async function assignRole(data) {
     return new Promise(async (resolve, reject) => {
          try {
               logger.info(`services - admin - assignRole - ${JSON.stringify(data)} - `);
               if (DEFAULT_ROLE.findIndex((role) => role.role_id == data.roleId) == -1) {
                    return resolve({
                         message: "invalid role Id, please provide valid role Id",
                    });
               }
               const [affectedCount] = await User.update(
                    { roleId: data.roleId },
                    {
                         where: {
                              userId: data.userId,
                         },
                    }
               );
               if (affectedCount) resolve({ message: `Role updated to ${data.userId} userId` });
               else resolve({ message: "User not found to assign or update role" });
          } catch (err) {
               logger.error(`services - admin - assignRole - Exception - ${err}`);
               reject(err);
          }
     });
}

module.exports = {
     assignRole,
};
