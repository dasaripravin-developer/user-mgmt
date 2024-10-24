module.exports = {
     defaultRole: [
          {
               role_id: 1,
               role_name: "Admin",
               description: "We have all permission",
               created_at: new Date(),
               updated_at: new Date(),
          },
          {
               role_id: 2,
               role_name: "Super",
               description: "We have limited permission",
               created_at: new Date(),
               updated_at: new Date(),
          },
          {
               role_id: 3,
               role_name: "Viewer",
               description: "We have read permissions only",
               created_at: new Date(),
               updated_at: new Date(),
          },
     ],
     SALT_ROUND: 10,
};
