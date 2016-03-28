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
      .catch($log.error);
  }

  employeeFactoryFunc.updateEmployee = function (employee, region) {
    var regionIndex = employee.regions.indexOf(region);
    if(regionIndex === -1) employee.regions.push(region);
    else employee.regions.splice(regionIndex, 1);
    return $http.put("api/employees/" + employee._id, employee)
      .catch($log.error);
  }

  employeeFactoryFunc.deleteEmployee = function (employee) {
    return $http.delete("api/employees/" + employee._id)
      .catch($log.error);
  }

  return employeeFactoryFunc;
})
