app.controller('greetingController',[ '$scope', 'Person', function($scope, Person){

  $scope.userName = new Person();
  $scope.userName.name = 'User';
  
  $scope.addUser= function(){
    var user_name = document.getElementById("user_name");
    $scope.userName.name = user_name.value

    console.log($scope.userName.name)
  };

  $scope.greetingMessage = function(name) {
    return "Hello " + name + "!"
  }

}]);
