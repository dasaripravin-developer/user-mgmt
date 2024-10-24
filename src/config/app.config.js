require("dotenv").config()

module.exports = {
     port: process.env.PORT,
     adminPass: process.env.ADMIN_PASSWORD,
     secretKey: process.env.SECRET_KEY
};
