const { logger } = require("../../logger/logger.js");
const adminRole = require("../../utils/constant.utils.js").defaultRole.find((role) => role.role_name === "Admin");

async function authorization(request, response, next) {
     try {
          switch (request.userData.roleId) {
               case "1": // Admin role
                    break;
               case "2": // Super role
                    if (!["GET", "PUT"].includes(request.method) || (["GET"].includes(request.method) && request.path == "/user"))
                         return response.status(401).json({ message: "Not have permission to access resource" });
                    break;
               case "3": // Viewer role
                    if (!["GET"].includes(request.method) || (["GET"].includes(request.method) && request.path == "/user"))
                         return response.status(401).json({ message: "Not have permission to access resource" });
                    break;
               default:
                    break;
          }
          next();
     } catch (err) {
          logger.error(`middleware - authentication - exception - ${err.message}`);
          response.status(401).json({ message: err.message });
     }
}

module.exports = {
     authorization,
};
