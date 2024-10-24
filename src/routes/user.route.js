const express = require("express");
const {
     registerValidator,
     userParamsValidator,
     loginValidator,
     updateDataValidator,
     filterValidator
} = require("../middleware/input-validation/userValidator.middleware.js");
const { register, login, getUserByIdController, updateUser, deleteUserRecord, getUsers } = require("../controllers/user.controller.js");
const { authMiddleware } = require("../middleware/authentication/authentication.middleware.js");
const { authorization } = require("../middleware/authorization/authorization.js");

const userRouter = express.Router();

userRouter.post("/register", registerValidator, register);

userRouter.post("/login", loginValidator, login);

userRouter.get("/user/:id", authMiddleware, userParamsValidator, authorization, getUserByIdController);

userRouter.get('/user', authMiddleware, filterValidator, authorization, getUsers)

userRouter.put("/user", authMiddleware, updateDataValidator, authorization, updateUser);

userRouter.delete("/user/:id", authMiddleware, userParamsValidator, authorization, deleteUserRecord);

module.exports = { userRouter };
