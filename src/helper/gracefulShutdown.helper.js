const { sequelize } = require("../db/models/index");
const { logger } = require("../logger/logger");

async function gracefulShutDown(signal) {
     logger.error(`graceful shutdown process - signal - ${signal}`);
     await sequelize.close();
     process.exit(0);
}

module.exports = {
     gracefulShutDown,
};
