const { logger } = require("../logger/logger.js");
const { db } = require("../db/models/index.js");
const { hashPassword } = require("../helper/crypto.helper.js");
const { checkPassword } = require("../helper/crypto.helper.js");
const { sign } = require("../helper/jwt.helper.js");
const { Op } = require("sequelize");
const { User } = db;
const DEFAULT_ROLE = require("../utils/constant.utils.js").defaultRole.find((role) => role.role_name === "Super");

async function userRegister(data) {
     return new Promise(async (resolve, reject) => {
          try {
               logger.info(`services - user - userRegister - ${JSON.stringify(data)}`);
               const result = await User.findOne({
                    where: {
                         email: data.email,
                    },
               });
               if (result) {
                    return resolve({
                         message: `${data.email} user already register`,
                    });
               }

               data.password = await hashPassword(data.password);
               data.roleId = DEFAULT_ROLE.role_id;
               console.log("data ==>", data);
               const newUser = await User.create(data);
               resolve({
                    message: `${data.email} user registration success`,
               });
          } catch (err) {
               logger.error(`services - user - userRegister - Exception - ${err}`);
               reject(err);
          }
     });
}

async function userLogin(data) {
     return new Promise(async (resolve, reject) => {
          try {
               const user = await User.findOne({ where: { email: data.email }, attributes: { exclude: ["updatedAt", "createdAt"] } });
               if (!user || !(await checkPassword(data.password, user.password))) {
                    logger.info(`services - user - userLogin - invalid email or password - ${data.email}`);
                    return resolve({ message: "Invalid credentials" });
               }
               if (!user.isActive) {
                    return resolve({ message: "User is disable, please contact to admin to enable user" });
               }
               delete user.dataValues.password;
               let token = await sign({ ...user.dataValues });
               logger.info(`services - user - userLogin - user exist - ${data.email}`);
               return resolve({ message: "User login success", token });
          } catch (error) {
               logger.error(`services - user - userLogin - Exception - ${error}`);
               reject(error);
          }
     });
}

async function getUserById(userId) {
     return new Promise(async (resolve, reject) => {
          try {
               const user = await User.findByPk(userId, { attributes: { exclude: ["password"] } });
               if (!user) {
                    return resolve({ message: "user not found" });
               }
               return resolve(user);
          } catch (error) {
               logger.error(`services - user - getUserById - Exception - ${error}`);
               reject(error);
          }
     });
}

async function updateUserData(userId, updateData = {}) {
     return new Promise(async (resolve, reject) => {
          try {
               console.log('userId =>', userId)
               console.log('update data => ', updateData)
               const [affectedCount] = await User.update(updateData, { where: { userId: userId } });
               if (affectedCount) {
                    return resolve({ message: "Data updated" });
               }
               return resolve({ message: "User not found" });
          } catch (error) {
               logger.error(`services - user - updateUserData - Exception - ${error}`);
               reject(error);
          }
     });
}

async function deleteUser(userId) {
     return new Promise(async (resolve, reject) => {
          try {
               const result = await User.destroy({ where: { userId: userId } });
               if (result == 0) {
                    return resolve({ message: "user not found" });
               }
               return resolve({ message: "User deleted" });
          } catch (error) {
               logger.error(`services - user - deleteUser - Exception - ${error}`);
               reject(error);
          }
     });
}

async function getUsersByFilter(filters = {}) {
     return new Promise(async (resolve, reject) => {
          try {
               const users = await User.findAll({
                    attributes: { exclude: ["password"] },
                    where: {
                         [Op.and]: [
                              filters.firstName ? { firstName: { [Op.iLike]: `${filters.firstName}` } } : null,
                              filters.lastName ? { lastName: { [Op.iLike]: `${filters.lastName}` } } : null,
                              filters.email ? { email: { [Op.iLike]: `${filters.email}` } } : null,
                              filters.phone ? { phone: { [Op.iLike]: `${filters.phone}` } } : null,
                              filters.roleId ? { roleId: filters.roleId } : null,
                         ].filter(Boolean),
                    },
               });
               if (!users) {
                    return resolve({ message: "user not found" });
               }
               return resolve(users);
          } catch (error) {
               logger.error(`services - user - getUsers - Exception - ${error}`);
               reject(error);
          }
     });
}

module.exports = {
     userRegister,
     userLogin,
     getUserById,
     updateUserData,
     deleteUser,
     getUsersByFilter,
};
