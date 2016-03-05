angular.module("profile").controller("EditprofileController" , ["$scope" , "$http" , "$location" , "Authentication" , function($scope , $http , $location , Authentication){

	$scope.profile = {
		username: Authentication.user.username,
		firstName : Authentication.user.firstName,
		lastName: Authentication.user.lastName,
		email: Authentication.user.email
	};

	$scope.editProfile = function(){
		$http.put('/api/users/profile/edit' , $scope.profile).success(function(response){
			$location.path('profile');
		}).error(function(err){
			$scope.error = err.message;
		});
	};

}]);