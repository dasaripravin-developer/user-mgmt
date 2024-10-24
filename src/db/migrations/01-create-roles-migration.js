"use strict";

module.exports = {
     up: async (queryInterface, DataTypes) => {
          await queryInterface.createTable("roles", {
               roleId: {
                    autoIncrement: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                    field: "role_id",
               },
               roleName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    field: "role_name",
               },
               description: {
                    type: DataTypes.STRING,
                    allowNull: false,
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

     },

     down: async (queryInterface) => {
          await queryInterface.dropTable("roles", {});
     },
};
