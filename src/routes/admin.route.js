const express = require("express");
const { assignRoleController } = require("../controllers/admin.controller");
const { assginRoleValidator } = require("../middleware/input-validation/adminValidator.middleware");
const { authorization } = require("../middleware/authorization/authorization");

const adminRouter = express.Router();

adminRouter.post("/assign-role-to-user", assginRoleValidator, authorization, assignRoleController);

module.exports = { adminRouter };
