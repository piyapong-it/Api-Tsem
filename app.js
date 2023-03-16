require("dotenv").config();

// const https = require('https'); // production
const http = require('http');
const fs = require('fs');
const express = require("express");

const options = {
    key: fs.readFileSync('start.tapb.co.th.key'),
    cert: fs.readFileSync('star.tapb.co.th_bundle.crt')
  };

const app = express();  

const miscRouter = require("./api/miscellaneous/miscellaneous.router");
const userRouter = require("./api/users/user.router");
const outletRouter = require("./api/outlets/outlets.router");
const productRouter = require("./api/product/product.router");
const uploadRouter = require("./api/upload/upload.router");
const visitRouter = require("./api/visit/visit.router");
const assetRouter = require("./api/outletasset/outletasset.router");
const address = require("./api/address/address.router");

app.use(express.json());


app.use("/api/misc", miscRouter);
app.use("/api/users", userRouter);
app.use("/api/outlets", outletRouter);
app.use("/api/product", productRouter);
app.use("/upload", uploadRouter);
app.use("/api/visit", visitRouter);
app.use("/api/asset", assetRouter);
app.use("/api/address", address);


app.use('/profile', express.static('workfile/images'));
app.use('/assets', express.static('workfile/assets'));
app.use('/apk', express.static('workfile/apk'));
app.use('/salesfolder', express.static('workfile/salesfolder'));


app.get('/', function (req, res) {
  res.send('Hello World!');
});

var port = process.env.APP_PORT || 443;
// var server = https.createServer( options , app ); // production
var server = http.createServer(app);
server.listen( port, function () {
    console.log("Server up and running on PORT", process.env.APP_PORT);
});
