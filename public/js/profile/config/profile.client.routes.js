angular.module("profile").config(["$routeProvider" , function($routeProvider){
	$routeProvider.
		when("/profile" , {
			templateUrl: "js/profile/views/profile-view.client.view.html"
		}).
		when("/profile/edit" , {
			templateUrl: "js/profile/views/profile-edit.client.view.html"
		}).
		when("/profile/edit/password" , {
			templateUrl: "js/profile/views/profile-edit-password.client.view.html"
		});
}]);