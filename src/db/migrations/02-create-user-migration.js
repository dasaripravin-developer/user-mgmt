"use strict";
const { defaultRole } = require("../../utils/constant.utils.js");

module.exports = {
     up: async (queryInterface, DataTypes) => {
          await queryInterface.createTable("users", {
               userId: {
                    autoIncrement: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                    field: "user_id",
               },
               firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: "first_name",
               },
               lastName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: "last_name",
               },
               phone: {
                    type: DataTypes.STRING,
                    allowNull: false,
               },
               email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
               },
               password: {
                    type: DataTypes.STRING,
                    allowNull: false,
               },
               roleId: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
                    field: "role_id",
                    defaultValue: defaultRole.find((role) => role.role_name === "Super").role_id || 2,
               },
               isActive: {
                    type: DataTypes.BOOLEAN,
                    field: "is_active",
                    allowNull: true,
                    defaultValue: true,
               },
               createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
                    field: "created_at",
               },
               updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
                    field: "updated_at",
               },
          });

          await queryInterface.addIndex("users", ["email"], {
               name: "index_on_email",
               unique: true,
          });
     },

     down: async (queryInterface) => {
          await queryInterface.dropTable("users", {});
     },
};
