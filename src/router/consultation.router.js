const express = require("express");
const route = express.Router();
const ConsultationController = require("../controller/consultation.controller");
const { auth } = require("../middleware/auth.middleware")


route
.post("/create", ConsultationController.create)
.post("/list",auth, ConsultationController.list)
.post("/check", auth, ConsultationController.check)
    

module.exports = route;