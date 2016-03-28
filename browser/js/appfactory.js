northwind.factory("EmployeeFactory", function ($http, $log) {
  var employeeFactoryFunc = {};
  employeeFactoryFunc.getEmployees = function () {
    return $http.get("/api/employees")
      .then(function (response) {
        var employees = response.data;
        return employees;
      })
      .catch($log.error);
  }

  employeeFactoryFunc.addEmployee = function (employee) {
    return $http.post("/api/employees", employee)
      .then(function (response) {
        return;
      })
      .catch($log.error);
  }

  employeeFactoryFunc.updateEmployee = function (employee, region) {
    var regionIndex = employee.regions.indexOf(region);
    if(regionIndex === -1) employee.regions.push(region);
    else employee.regions.splice(regionIndex, 1);
    return $http.put("api/employees/" + employee._id, employee)
      .then(function () {
        return;
      })
  }

  employeeFactoryFunc.deleteEmployee = function (employee) {
    return $http.delete("api/employees/" + employee._id)
      .then(function () {
        return;
      })
  }

  return employeeFactoryFunc;
})
