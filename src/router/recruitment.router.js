const express = require("express");
const route = express.Router();
const recruitmentController = require("../controller/recruitment.controller");
const { auth } = require("../middleware/auth.middleware")

route
  .post("/list", auth, recruitmentController.list)
  .post("/create", recruitmentController.create)
  .post("/upload-cv", recruitmentController.uploadCV)
  .get("/cv/:id", recruitmentController.getCV)
    

module.exports = route;
