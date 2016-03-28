var express = require("express");
var Employee = require("../db").Employee;
var router = express.Router();

router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname, "../browser/index.html"));
})

router.get("/api/employees", function (req, res, next) {
  Employee.find()
    .then(function (employees) {
      res.send(employees);
    })
})

router.post("/api/employees", function (req, res, next) {
  console.log('hitting post route',req.body.name, req.body.regions);
  Employee.create({
    name: req.body.name,
    regions: req.body.regions
  })
    .then(function () {
      res.sendStatus(201);
    })
})

router.put("/api/employees/:id", function(req, res, next) {
  Employee.findById(req.params.id)
    .then(function (employee) {
      employee.regions = req.body.regions;
      return employee.save();
    })
    .then(function () {
      res.sendStatus(201);
    })
})

router.delete("/api/employees/:id", function(req, res, next) {
  Employee.findByIdAndRemove(req.params.id)
    .then(function () {
      res.sendStatus(201);
    })
})

module.exports = router;
