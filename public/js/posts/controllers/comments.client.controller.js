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