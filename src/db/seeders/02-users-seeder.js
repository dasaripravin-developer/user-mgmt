"use strict";
const { defaultRole } = require("../../utils/constant.utils.js");
const { hashPassword } = require("../../helper/crypto.helper.js");
const { adminPass } = require("../../config/app.config.js");

module.exports = {
     async up(queryInterface) {
          await queryInterface.bulkInsert("users", [
               {
                    first_name: "Admin",
                    last_name: "Admin",
                    email: "admin@gmail.com",
                    password: await hashPassword(adminPass || "admin"),
                    phone: '8888149966',
                    role_id: defaultRole.find((role) => role.role_name === "Admin").role_id,
               },
          ]);
     },

     async down(queryInterface) {
          await queryInterface.bulkDelete("users", null, {});
     },
};
