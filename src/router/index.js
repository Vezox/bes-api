const express = require("express")
const app = express()
const { auth } = require("../middleware/auth.middleware");
const checkUpload = require("../middleware/upload.middleware");


app.use("/api/user", require("./user.router"))
app.use("/api/post", require("./post.router"))
app.use("/api/topic", require("./topic.route"))
app.use("/api/image", require("./image.router"))
app.use("/api/upload", checkUpload, require("./upload.router"))
app.use("/api/consultation", require("./consultation.router"))
app.use("/api/recruitment", require("./recruitment.router"))

module.exports = app