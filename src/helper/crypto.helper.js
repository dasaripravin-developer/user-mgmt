const bcrypt = require("bcrypt");
const { SALT_ROUND } = require("../utils/constant.utils.js");

module.exports = {
     async hashPassword(password) {
          return bcrypt.hashSync(password, SALT_ROUND);
     },

     async checkPassword(password, hashPassword) {
          return bcrypt.compareSync(password, hashPassword);
     },
};
