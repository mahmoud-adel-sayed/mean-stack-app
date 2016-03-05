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

angular.module("users" , []);
angular.module("posts" , []);
angular.module("profile" , []);
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
angular.module("posts").controller("CommentsController" , ["$scope" , "$routeParams" , "Comments" , function($scope , $routeParams , Comments){
	
	$scope.comment = {};

	$scope.create = function(){
		var comment = new Comments({
			content: $scope.comment.content
		});

		comment.$save({postId: $routeParams.postId}, 
			function(respond){
				$scope.comment = {};
				$scope.comments.splice(0, 0, respond);
			},
			function(errorResponse){
				$scope.error = errorResponse.data.message;
		});
	};

	$scope.find = function(){
		$scope.comments = Comments.query({
			postId: $routeParams.postId
		});
	};
}]);
angular.module("posts").controller("PostsController", ["$scope" , "$routeParams" , "$location" , "Posts" , "Authentication" , "$http" , function($scope , $routeParams , $location , Posts , Authentication , $http){
	
	$scope.authentication = Authentication;
	$scope.post = {};
	$scope.loading = true;

	$scope.create = function(){

		var uploadUrl = "/api/posts";
		var data = $scope.post;

		var fd = new FormData();

        for(var key in data)
        	fd.append(key , data[key]);
        
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
        	$location.path("posts/" + response._id);
        })
        .error(function(errorResponse){
        	$scope.error = errorResponse.message;
        });

	}

	$scope.find = function(){
		$scope.posts = Posts.query(function(){
			$scope.loading = false;
		});
	}

	$scope.findOne = function(){
		$scope.post = Posts.get({
			postId: $routeParams.postId
		});
	}

	$scope.update = function(){
		$scope.post.$update(function(response){
			$location.path("posts/" + $scope.post._id);
		},function(errorResponse){
			$scope.error = errorResponse.data.message;
		});
	}

	$scope.delete = function(post){
		if(post){
			post.$remove(function(){
				for(var i in $scope.posts){
					if($scope.posts[i] === post){
						$scope.posts.slice(i , 1);
					}
				}
			});
		}else{
			$scope.post.$remove(function(){
				$location.path("/");
			});
		}
	}

}]);
angular.module("posts").directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
angular.module("posts").factory("Comments" ,["$resource" , function($resource){
	return $resource("api/posts/:postId/comments" , {
		postId: "@_id"
	},{
		update: {
			method: "PUT"
		}
	});
}]);
angular.module("posts").factory("Posts" ,["$resource" , function($resource){
	return $resource("api/posts/:postId" , {
		postId: "@_id"
	},{
		update: {
			method: "PUT"
		}
	});
}]);
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
angular.module("profile").controller("ChangePassController" , ["$scope" , "$http" , "$window" , function($scope , $http , $window){
  $scope.credentionals = {};

  $scope.changePassword = function(){
    if(!$scope.credentionals.oldPass){
      $scope.error = "Please enter your old password";
    }else if(!$scope.credentionals.newPass){
      $scope.error = "Please enter your new password";
    }else if($scope.credentionals.newPass !== $scope.credentionals.confirmPass){
      $scope.error = "new & confirm password do not match";
    }else{
      $http.put("/api/users/profile/changePassword" , $scope.credentionals).success(function(){
        $window.location.href = '/';
      }).error(function(err){
        $scope.error = err.message;
      });
    }
  };

}]);

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
angular.module("users").controller("UsersController" , ["$scope" , "Authentication" , function($scope , Authentication){
	$scope.authentication = Authentication;
}]);
angular.module("users").factory("Authentication" , [function(){
	this.user = window.user;
	return {
		user: this.user
	}
}]);