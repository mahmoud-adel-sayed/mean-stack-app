angular.module("posts").config(["$routeProvider" , function($routeProvider){
	$routeProvider.
		when("/posts/create" , {
			templateUrl: "js/posts/views/create-view.client.view.html"
		}).
		when("/posts/:postId" , {
			templateUrl: "js/posts/views/post-view.client.view.html"
		}).
		when("/posts/:postId/edit" , {
			templateUrl: "js/posts/views/edit-view.client.view.html"
		});
}]);