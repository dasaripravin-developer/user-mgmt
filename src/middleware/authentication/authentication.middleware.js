const { logger } = require("../../logger/logger.js");
const { verify } = require("../../helper/jwt.helper.js");

async function authMiddleware(request, response, next) {
     try {
          const decoded = await verify(request.headers?.authorization);
          if (decoded instanceof Error) return response.status(401).json({ message: decoded.message });
          logger.info(`middleware - authentication - decoded - ${JSON.stringify(decoded)}`);
          request.userData = decoded;
          next();
     } catch (err) {
          logger.error(`middleware - authentication - exception - ${err.message}`);
          response.status(401).json({ message: err.message });
     }
}

module.exports = {
     authMiddleware,
};
