"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../../config/database.config.js");
const { logger } = require("../../logger/logger.js");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];
const db = {};

const sequelize = new Sequelize(`postgres://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);

fs.readdirSync(__dirname)
     .filter((file) => {
          return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js" && file.indexOf(".test.js") === -1;
     })
     .forEach((file) => {
          const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
          db[model.name] = model;
     });

Object.keys(db).forEach((modelName) => {
     if (db[modelName].associate) {
          db[modelName].associate(db);
     }
});

async function checkDBConnection() {
     return new Promise(async (resolve, reject) => {
          try {
               await sequelize.authenticate();
               logger.info(`db - index - checkDBConnection - db connection made`);
               resolve();
          } catch (err) {
               logger.error(`db - index - checkDBConnection - Error - ${err}`);
               reject(err);
          }
     });
}

module.exports = { sequelize, Sequelize, db, checkDBConnection };
