angular.module("posts").controller("CommentsController" , ["$scope" , "$routeParams" , "Comments" , function($scope , $routeParams , Comments){

	$scope.comment = {};
	$scope.loading = false;

	$scope.create = function(){
		var comment = new Comments({
			content: $scope.comment.content
		});

		comment.$save({postId: $routeParams.postId},
			function(respond){
				$scope.comment = {} , $scope.error = false;
				
				$scope.find();
				$scope.comments.splice(0, 0, respond);
			},
			function(errorResponse){
				$scope.error = errorResponse.data.message;
		});
	};

	$scope.find = function(){
		$scope.loading = true;
		var comments = Comments.query({ postId: $routeParams.postId } , function(){
			$scope.comments = comments;
			$scope.loading = false;
		});
	};
}]);
