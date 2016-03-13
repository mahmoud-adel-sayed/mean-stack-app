angular.module("profile").controller("EditprofileController" , ["$scope" , "$http" , "$window" , "Authentication" , function($scope , $http , $window , Authentication){

	$scope.profile = {
		username: Authentication.user.username,
		firstName : Authentication.user.firstName,
		lastName: Authentication.user.lastName,
		email: Authentication.user.email
	};

	$scope.editProfile = function(){
		var data = $scope.profile;
		var fd = new FormData();

    for(var key in data)
    	fd.append(key , data[key]);

      $http.put('/api/users/profile/edit', fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
      .success(function(response){
      	$window.location.href = '/';
      })
      .error(function(errorResponse){
      	$scope.error = errorResponse.message;
      });
	};

}]);
