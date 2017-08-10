var myTest = angular.module('myTest', []);
myTest.controller('BasketCtrl', function BasketCtrl($scope){
  $scope.description = 'Single ticket';
  $scope.cost = 8;
  $scope.qty = 1;
});
