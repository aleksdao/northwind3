var express = require("express");
var Employee = require("../db").Employee;
var router = express.Router();

module.exports = router;


router.get("/", function (req, res, next) {
  Employee.find()
    .then(function (employees) {
      res.send(employees);
    }, next);
});

router.post("/", function (req, res, next) {
  console.log('hitting post route',req.body.name, req.body.regions);
  Employee.create({
    name: req.body.name,
    regions: req.body.regions
  })
    .then(function () {
      res.sendStatus(201);
    }, next);
});

router.put("/:id", function(req, res, next) {
  Employee.findById(req.params.id)
    .then(function (employee) {
      employee.regions = req.body.regions;
      return employee.save();
    })
    .then(function () {
      res.sendStatus(201);
    }, next);
});

router.delete("/:id", function(req, res, next) {
  Employee.findByIdAndRemove(req.params.id)
    .then(function () {
      res.sendStatus(201);
    }, next);
});

