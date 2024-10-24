const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/app.config");

module.exports = {
     async sign(data) {
          return jwt.sign(data, secretKey, { expiresIn: "10m" });
     },

     async verify(token) {
          if (!token) return new Error("Unauthorized user");
          let t = token.split(" ")[1];
          if (!t) return new Error("Unauthorized user");
          return jwt.verify(t, secretKey);
     },
};
