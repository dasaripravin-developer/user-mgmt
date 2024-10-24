"use strict";
const { defaultRole } = require("../../utils/constant.utils.js");

module.exports = {
     async up(queryInterface) {
          await queryInterface.bulkInsert("roles", defaultRole);
     },

     async down(queryInterface) {
          await queryInterface.bulkDelete("roles", null, {});
     },
};
