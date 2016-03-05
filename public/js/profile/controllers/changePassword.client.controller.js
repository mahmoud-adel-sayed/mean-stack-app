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
