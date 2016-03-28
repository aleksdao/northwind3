var express = require("express");
var Promise = require("bluebird");
var path = require("path");
var bodyParser = require("body-parser");
var Employee = require("./db").Employee;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/bootstrap", express.static(path.join(__dirname, "./node_modules/bootstrap/dist")));
app.use("/angular", express.static(path.join(__dirname, "./node_modules/angular")));
app.use(express.static(path.join(__dirname, "./browser")));

app.use("/", require("./routes"));

module.exports = app;
