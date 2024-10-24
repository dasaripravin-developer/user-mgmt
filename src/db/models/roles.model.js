module.exports = (sequelize, DataTypes) => {
     const roles = sequelize.define(
          "Roles",
          {
               roleId: {
                    autoIncrement: true,
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    primaryKey: true,
               },
               roleName: {
                    type: DataTypes.STRING,
                    allowNull: false,
               },
               description: {
                    type: DataTypes.STRING,
                    allowNull: false,
               },
          },
          {
               sequelize,
               tableName: "roles",
               underscored: true,
               timestamps: true,
               indexes: [
                    {
                         name: "role_pkey",
                         unique: true,
                         fields: [{ name: "role_id" }],
                    },
               ],
          }
     );

     return roles;
};
