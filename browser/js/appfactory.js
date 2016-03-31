//use single quotes for string.. why? why not!!
angular.module('northwind')
  .factory("EmployeeFactory", function ($http, $log) {
    var factory = {};
    factory.getEmployees = function () {
      return $http.get("/api/employees")
        .then(function (response) {
          var employees = response.data;
          return employees;
        })
        .catch($log.error);
    };

    factory.addEmployee = function (employee) {
      return $http.post("/api/employees", employee)
        .catch($log.error);
    };

    factory.updateEmployee = function (employee, region) {
      var regionIndex = employee.regions.indexOf(region);
      if(regionIndex === -1) employee.regions.push(region);
      else employee.regions.splice(regionIndex, 1);
      return $http.put("api/employees/" + employee._id, employee)
        .catch($log.error);
    };

    factory.deleteEmployee = function (employee) {
      return $http.delete("api/employees/" + employee._id)
        .catch($log.error);
    };

    return factory;
  });
