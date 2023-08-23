const express = require("express");
const route = express.Router();
const franchiseController = require("../controller/franchise.controller");
const { auth } = require("../middleware/auth.middleware")

route
  .post("/create", franchiseController.create)
  .post("/get", auth, franchiseController.get)
  .post("/check", auth, franchiseController.check)


module.exports = route;