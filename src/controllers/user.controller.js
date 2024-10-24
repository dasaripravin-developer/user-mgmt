const { logger } = require("../logger/logger.js");
const { userRegister, userLogin, getUserById, updateUserData, deleteUser, getUsersByFilter } = require("../services/user.service.js");

async function register(request, response) {
     try {
          logger.info(`controller - user - register - `);
          response.status(200).json(await userRegister(request.body));
     } catch (error) {
          logger.error(`controller - user - register - Exception - ${error}`);
          response.status(500).json({ message: error.message });
     }
}

async function login(request, response) {
     try {
          logger.info(`controller - user - login - `);
          const res = await userLogin(request.body);
          logger.info(`controller - user - login - response - ${JSON.stringify(res)}`);
          response.status(200).json(res);
     } catch (err) {
          logger.error(`controller - user - login - Exception - ${err}`);
          response.status(500).json({ message: err.message });
     }
}

async function getUserByIdController(request, response) {
     try {
          logger.info(`controller - user - getUserByIdController - `);
          const result = await getUserById(request.params.id);
          logger.info(`controller - user - getUserByIdController - response - ${JSON.stringify(result)}`);
          response.status(200).json(result);
     } catch (err) {
          logger.error(`controller - user - getUserByIdController - Exception - ${err}`);
          response.status(500).json({ message: err.message });
     }
}

async function updateUser(request, response) {
     try {
          logger.info(`controller - user - updateUser - `);
          const result = await updateUserData(request.userData.userId, request.body);
          logger.info(`controller - user - updateUser - response - ${JSON.stringify(result)}`);
          response.status(200).json(result);
     } catch (err) {
          logger.error(`controller - user - updateUser - Exception - ${err}`);
          response.status(500).json({ message: err.message });
     }
}

async function deleteUserRecord(request, response) {
     try {
          logger.info(`controller - user - deleteUserRecord - `);
          const result = await deleteUser(request.params.id);
          logger.info(`controller - user - deleteUserRecord - response - ${JSON.stringify(result)}`);
          response.status(200).json(result);
     } catch (err) {
          logger.error(`controller - user - deleteUserRecord - Exception - ${err}`);
          response.status(500).json({ message: err.message });
     }
}

async function getUsers(request, response) {
     try {
          logger.info(`controller - user - getUsers - `);
          const result = await getUsersByFilter(request.body);
          logger.info(`controller - user - getUsers - response - ${JSON.stringify(result)}`);
          response.status(200).json(result);
     } catch (err) {
          logger.error(`controller - user - getUsers - Exception - ${err}`);
          response.status(500).json({ message: err.message });
     }
}

module.exports = {
     register,
     login,
     getUserByIdController,
     updateUser,
     deleteUserRecord,
     getUsers
};
