app.controller('indexController', [
  '$scope',
  '$http',
  '$cookies',
  '$route',
  '$routeParams',
  '$location',
  '$mdDialog',
  function(
    $scope,
    $http,
    $cookies,
    $route,
    $routeParams,
    $location,
    $mdDialog
  ){

  // general variables
  $scope.selected_tab = 0;
  $scope.warning_message = '';
  $scope.isShowPreferences = false;
  // routes setup
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;

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
          if(success.data.status === 'EXISTING_USERNAME') {
            $scope.warning_message = 'Username already exists.';
            showDialog();
          } else if(success.data.status === 'SUCCESS'){
            $http({
              method : 'POST',
              url    : '/api/user',
              data   : { username : $scope.username_input, password : $scope.password_input }
            })
            .then(function(success) {
              $scope.warning_message = 'Successfully Registered New User!';
              showDialog();
              //reset input fields and switch to login tab
              $scope.username_input = "";
              $scope.password_input = "";
              $scope.password_input_confirm = "";
              $scope.selected_tab = 0;
              // Uncomment below for testing
              // console.log(success)
            }, function(error) {
              $scope.warning_message = 'Failed to Register New User.';
              showDialog();
              // Uncomment below for testing
              console.log(error)
            });
          }
        }, function(error) {
            console.log(error)
        });
      } else {
        $scope.warning_message = 'Please verify that both passwords have the same value!';
        showDialog();
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
          $scope.warning_message = 'Please confirm that the username is spelled correctly.';
          showDialog();
          return;
        }

        if(success.data.status === 'INCORRECT_PASSWORD') {
          $scope.warning_message = 'Please confirm that you wrote your password correctly.';
          showDialog();
          return;
        }
        $cookies.putObject('user', success.data.user_info);
        window.location = success.data.redirect

      }, function (error) {
        // Uncomment below for testing
        // console.log(error)
      });
    } else {
      $scope.warning_message = 'Please input username and password';
      showDialog();
    }
  };

  $scope.logoutUser = function() {
    $cookies.remove('user');
    $cookies.remove('selected_activity_id');
    window.location = '/';
  }
  // preference toggle
  $scope.showPreferences = function() {
    $scope.isShowPreferences = true;
  }

  $scope.hidePreferences = function() {
    $scope.isShowPreferences = false;
  }

  // dialog template
  function showDialog($event) {
     var parentEl = angular.element(document.body);

     $mdDialog.show({
       parent: parentEl,
       targetEvent: $event,
       template:
         '<md-dialog aria-label="List dialog">' +
         '<md-toolbar class="dialog-header">' +
           '<div class="md-toolbar-tools">' +
             '<h2>Warning!</h2>' +
             '<span flex></span>' +
           '</div>' +
         '</md-toolbar>' +
         '  <md-dialog-content>'+
         '    <md-list>'+
                $scope.warning_message +
         '    </md-list>'+
         '  </md-dialog-content>' +
         '  <md-dialog-actions>' +
         '    <md-button ng-click="closeDialog()" class="md-primary">' +
         '      Close Dialog' +
         '    </md-button>' +
         '  </md-dialog-actions>' +
         '</md-dialog>',
       locals: {
         items: $scope.items
       },
       controller: DialogController
    });
    function DialogController($scope, $mdDialog, items) {
      $scope.closeDialog = function() {
        $mdDialog.hide();
      }
    }
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
