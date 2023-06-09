require("dotenv").config();
const express = require("express");
const router = require("./router");
const cors = require("cors")
const fileUpload = require("express-fileupload");
const connectDB = require("./config/connect.db")
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : 'src/tmp/'
}));

app.use(router);
connectDB();


const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server run on ${PORT}`));
