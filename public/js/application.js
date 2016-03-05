var main = angular.module("main" , ["ngResource" , "ngRoute", "posts" , "users" , "profile"]);

main.config(["$locationProvider" , "$routeProvider" , function($locationProvider , $routeProvider){

	$locationProvider.hashPrefix("!");

	$routeProvider.
		when("/" ,{
			templateUrl: "js/posts/views/list-view.client.view.html"
		}).
		otherwise({
			redirectTo: '/'
		});

}]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function(){
	angular.bootstrap(document, ["main"]);
});
