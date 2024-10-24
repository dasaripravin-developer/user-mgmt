const express = require("express");
const { getRoles } = require("../controllers/role.controller.js");
const { authorization } = require("../middleware/authorization/authorization.js");

const roleRouter = express.Router();

roleRouter.get("/", authorization, getRoles);

module.exports = { roleRouter };
