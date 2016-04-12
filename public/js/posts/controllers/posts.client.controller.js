angular.module("posts").controller("PostsController", ["$scope" , "$routeParams" , "$location" , "Posts" , "Authentication" , "$http" , function($scope , $routeParams , $location , Posts , Authentication , $http){

	$scope.authentication = Authentication;
	$scope.post = {};
	$scope.loading = true;
	$scope.loading2 = false;

	$scope.create = function(){
		$scope.loading2 = true;

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
					$scope.loading2 = false;
        });
	};

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
