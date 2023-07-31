require("dotenv").config();
const express = require("express");
const router = require("./router");
const cors = require("cors")
const fileUpload = require("express-fileupload");
const connectDB = require("./config/connect.db")
const https = require('https');
const fs = require('fs');
const app = express();

const options = {
  key: fs.readFileSync('src/cert/server.key'),
  cert: fs.readFileSync('src/cert/server.crt'),
};
const httpsServer = https.createServer(options, app);

app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : 'src/tmp/'
}));

app.use(router);
connectDB();


const PORT = process.env.PORT;
httpsServer.listen(PORT, console.log(`Server run on ${PORT}`));
