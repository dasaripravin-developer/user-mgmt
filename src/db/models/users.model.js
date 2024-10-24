"use strict";

module.exports = (sequelize, DataTypes) => {
     const users = sequelize.define(
          "User",
          {
               userId: {
                    autoIncrement: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
               },
               firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
               },
               lastName: {
                    type: DataTypes.STRING,
                    allowNull: false,
               },
               email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
               },
               roleId: {
                    type: DataTypes.BIGINT,
                    allowNull: true,
               },
               password: {
                    type: DataTypes.STRING,
                    allowNull: false,
               },
               phone: {
                    type: DataTypes.STRING,
                    allowNull: false,
               },
               isActive: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
               },
          },
          {
               sequelize,
               underscored: true,
               tableName: "users",
               timestamps: true,
               indexes: [
                    {
                         name: "user_pkey",
                         unique: true,
                         fields: [{ name: "user_id" }],
                    },
                    {
                         name: "index_on_email",
                         unique: true,
                         fields: [{ name: "email" }],
                    },
               ],
          }
     );

     return users;
};
