var nameSpace = angular.module("WaProduct",  ['ngResource']);


/**
 * Products is a service that calls a REST API
 * It's not really a REST API, but just calling our sample.json file
 * as an example
 * If you call Products.query(), it will GET sample.json
 * If you call Products.get({}, {aid: 1}) it will GET products/1.json
 */
nameSpace.factory('Products', function($resource) {
  return $resource('assets/js/sample.json');
});

// Create the controller, the 'PersonCtrl' parameter must 
// match an ng-controller directive
nameSpace.controller('GetProducts', function ($scope,Products) {
  // Initialze Toddlers from JSON defined on initial page load
  $scope.products = Products.query();
});
/*nameSpace.controller("GetProducts", ['$scope','$http', function($scope, $http){    
	$scope.products ={};
	$http.get('assets/js/sample.json').then(function(response){
		$scope.products = response.data.Sheet1;
		console.log($scope.products[0]['Retailer']);
		
	});
}]);*/