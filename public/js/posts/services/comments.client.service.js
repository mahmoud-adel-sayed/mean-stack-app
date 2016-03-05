angular.module("posts").factory("Comments" ,["$resource" , function($resource){
	return $resource("api/posts/:postId/comments" , {
		postId: "@_id"
	},{
		update: {
			method: "PUT"
		}
	});
}]);