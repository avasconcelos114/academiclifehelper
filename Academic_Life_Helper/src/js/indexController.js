app.controller('indexController', [ '$scope', '$http', function($scope, $http){

  // CSS Selector
  $scope.selectedSheet = "index-light";
  $scope.changeCss = function(sheet){
    $scope.selectedSheet = sheet;
  }

  // Register new users
  $scope.registerUser = function() {
    if($scope.username_input.length > 5 && $scope.password_input.length > 5) {
      $http({
        method : 'POST',
        url    : '/api/user',
        data   : { username : $scope.username_input, password : $scope.password_input }
      })
      .then(function (success) {
        alert('Successfully Registered New User!');
        // Uncomment below for testing
        console.log(success)
      }, function (error) {
        alert('Failed to Register New User.');
        // Uncomment below for testing
        console.log(error)
      });

    }
  }

  // Login users
  $scope.loginUser = function() {
    $http({
      method : 'GET',
      url    : '/api/login',
      data   : { username : $scope.login_username_input, password : $scope.login_password_input }
    })
    .then(function (success) {
      // Uncomment below for testing
      console.log(success)
      window.location = success.data.redirect
    }, function (error) {
      // Uncomment below for testing
      console.log(error)
    });
  };

}]).directive('ngEnter', function() {
    return function(scope, elem, attrs) {
      elem.bind("keydown keypress", function(event) {
        // 13 represents enter button
        if (event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
  });
