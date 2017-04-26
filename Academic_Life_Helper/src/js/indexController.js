app.controller('indexController', [ '$scope', '$http', '$cookies', function($scope, $http, $cookies){

  $scope.selected_tab = 0;

  // data from user logged in
  if($cookies.get('user')) {
    // redirect to /classes if session already started
    if(window.location.pathname === '/') {
      window.location.pathname = '/classes';
    }

    $scope.logged_user_info =  JSON.parse($cookies.get('user'));
    $scope.logged_username = $scope.logged_user_info.username;
  }

  // CSS Selector
  $scope.selectedSheet = "index-light";
  $scope.changeCss = function(sheet){
    $scope.selectedSheet = sheet;
  }

  // Register new users
  $scope.registerUser = function() {
      if($scope.password_input === $scope.password_input_confirm) {
        $http({
          method : 'POST',
          url    : '/api/userVerify',
          data   : { username : $scope.username_input }
        })
        .then(function(success) {
          console.log(success)
          if(success.data.status === 'EXISTING_USERNAME') {
            alert('Username already exists.')
          } else if(success.data.status === 'SUCCESS'){
            $http({
              method : 'POST',
              url    : '/api/user',
              data   : { username : $scope.username_input, password : $scope.password_input }
            })
            .then(function(success) {
              alert('Successfully Registered New User!');
              //reset input fields and switch to login tab
              $scope.username_input = "";
              $scope.password_input = "";
              $scope.password_input_confirm = "";
              $scope.selected_tab = 0;
              // Uncomment below for testing
              // console.log(success)
            }, function(error) {
              alert('Failed to Register New User.');
              // Uncomment below for testing
              console.log(error)
            });
          }
        }, function(error) {
            console.log(error)
        });
      } else {
        alert('Please verify that both passwords have the same value!');
        return;
      }
  }

  // Login users
  $scope.loginUser = function() {
    if($scope.login_username_input.length > 0 && $scope.login_password_input.length > 0) {
      $http({
        method : 'POST',
        url    : '/api/login',
        data   : { username : $scope.login_username_input, password : $scope.login_password_input }
      })
      .then(function (success) {
        // Uncomment below for testing
        // console.log(success)
        if(success.data.status === 'USERNAME_NOT_FOUND') {
          alert('Please confirm that the username is spelled correctly.');
          return;
        }

        if(success.data.status === 'INCORRECT_PASSWORD') {
          alert('Please confirm that you wrote your password correctly.');
          return;
        }
        $cookies.putObject('user', success.data.user_info);
        window.location = success.data.redirect

      }, function (error) {
        // Uncomment below for testing
        // console.log(error)
      });
    } else {
      alert('Please input username and password');
    }

  };

  $scope.logoutUser = function() {
    $cookies.remove('user');
    window.location = '/';
  }
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

  app.directive('noSpaceValidation', function() {
      return {
          restrict: 'A',

          link: function($scope, $element) {
              $element.bind('keydown', function(e) {
                  if ( e.which === 32  ) {
                      e.preventDefault();
                  }
              });
          }
      }
  });

app.directive('noSpecialChar', function() {
return {
  require: 'ngModel',
  restrict: 'A',
  link: function(scope, element, attrs, modelCtrl) {
    modelCtrl.$parsers.push(function(inputValue) {
      if (inputValue == null)
        return ''
      cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
      if (cleanInputValue != inputValue) {
        modelCtrl.$setViewValue(cleanInputValue);
        modelCtrl.$render();
      }
      return cleanInputValue;
    });
  }
} });
