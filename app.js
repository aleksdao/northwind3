var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//why?

app.use("/bootstrap", express.static(path.join(__dirname, "./node_modules/bootstrap/dist")));
app.use("/angular", express.static(path.join(__dirname, "./node_modules/angular")));
app.use(express.static(path.join(__dirname, "./browser")));

app.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../browser/index.html"));
});//semi colons!!

app.use("/api/employees", require("./routes"));
//how about an error handling route?

module.exports = app;
