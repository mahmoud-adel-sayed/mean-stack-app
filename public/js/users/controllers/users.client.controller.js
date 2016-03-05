angular.module("users").controller("UsersController" , ["$scope" , "Authentication" , function($scope , Authentication){
	$scope.authentication = Authentication;
}]);