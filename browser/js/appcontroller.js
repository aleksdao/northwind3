angular.module('northwind')
  .controller("EmployeesCtrl", function ($scope, EmployeeFactory) {
    $scope.regions = ["North", "South", "East", "West"];

    var initializeEmployee = function () {
      $scope.regionsSelected = [];
      $scope.newEmployee = {
        name: null,
        regions: $scope.regionsSelected
      };
    };

    $scope.getRegionIndex = function (region) {
      return $scope.regionsSelected.indexOf(region);
    };

    $scope.toggleRegion = function (region) {
      var regionIndex = $scope.getRegionIndex(region);
      if(regionIndex === -1) $scope.regionsSelected.push(region);
      else $scope.regionsSelected.splice(regionIndex, 1);
    };

    var getEmployees = function () {
      EmployeeFactory.getEmployees()
        .then(function (employees) {
          $scope.employees = employees;
        });
    };

    $scope.addEmployee = function () {
      EmployeeFactory.addEmployee($scope.newEmployee)
        .then(function () {
          getEmployees();
          initializeEmployee();
        });
    };

    $scope.updateEmployee = function (employee, region) {
      EmployeeFactory.updateEmployee(employee, region)
        .then(function () {
          getEmployees();
        });
    };

    $scope.deleteEmployee = function (employee) {
      EmployeeFactory.deleteEmployee(employee)
        .then(function () {
          getEmployees();
        });
    };

    $scope.threeRegions = function (employee, region) {
      return employee.regions.indexOf(region) === -1 && employee.regions.length === 3;
    };

    initializeEmployee();
    getEmployees();

  });
