require("dotenv").config()

module.exports = {
     development: {
          username: process.env.USER_NAME,
          password: process.env.PASSWORD,
          database: process.env.DB_NAME,
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          dialect: process.env.DIALECT,
     },
};
