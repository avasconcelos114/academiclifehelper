app.controller('activitiesController',
[
  '$scope',
  '$http',
  '$cookies',
  '$location',
  '$mdDialog',
  function(
    $scope,
    $http,
    $cookies,
    $location,
    $mdDialog
  ){

  // initialized variables to be shown on screen
  $scope.activities = [];


  // selected array values
  if($cookies.get('selected_activity_id') >= 0) $scope.selected_activity_id = parseInt($cookies.get('selected_activity_id'));
  else $scope.selected_activity_id = -1;

  // Activity Controls
  $scope.getActivityList = function(){
    $http.get('/api/' + $scope.logged_user_id + '/activities')
    .then(
      function(success){
        $scope.activities = success.data
        // Uncomment below for testing
        // console.log($scope.activities)
      },
      function(error){
        // Uncomment below for testing
        // console.log(error)
      }
    )
  };

  $scope.selectActivity = function(activity_id) {
    $cookies.put('selected_activity_id', activity_id);
    $scope.selected_activity_id = activity_id;
    // $location.path('classes');

  };

  $scope.addActivity = function(){
    if($scope.activity_input.length > 0) {
      $http({
        method : 'POST',
        url    : '/api/' + $scope.logged_user_id + '/activity',
        data   : { title : $scope.activity_input}
      })
      .then(function (success) {
        $scope.getActivityList()
        $scope.activity_input = "";
        // Uncomment below for testing
        // console.log(success)
      }, function (error) {
        // Uncomment below for testing
        // console.log(error)
      });
    }
  };

  $scope.removeActivityDialog = function(activity_id) {
    function openDialog($event) {
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
           '      Are you sure you would like to remove this activity?' +
           '    </md-list>'+
           '  </md-dialog-content>' +
           '  <md-dialog-actions>' +
           '    <md-button ng-click="closeDialog()" class="md-primary">' +
           '      Cancel' +
           '    </md-button>' +
           '    <md-button ng-click="removeActivity('+activity_id+')" class="md-primary">' +
           '      Remove' +
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

        $scope.removeAssignmentFromActivity = function(activity_id) {
          $http({
            method : 'DELETE',
            url    : '/api/assignmentFromActivity/' + activity_id
          })
          .then(
            function(success){
              // Uncomment below for testing
              // console.log(success)
            },
            function(error){
              // Uncomment below for testing
              // console.log(error)
            }
          );
        };

        $scope.removeActivity = function(activity_id){
            $http({
              method : 'DELETE',
              url    : '/api/activity/' + activity_id
            })
            .then(
              function(success){

                $scope.closeDialog()
                $scope.removeAssignmentFromActivity(activity_id)
                $cookies.remove('selected_activity_id')
                window.location.reload()
                // Uncomment below for testing
                // console.log(success)
              },
              function(error){
                // Uncomment below for testing
                // console.log(error)
              }
            );
        };
      }
    }

    openDialog();
  };

  $scope.removeAssignmentFromActivity = function(activity_id) {
    $http({
      method : 'DELETE',
      url    : '/api/assignmentFromActivity/' + activity_id
    })
    .then(
      function(success){
        // Uncomment below for testing
        // console.log(success)
      },
      function(error){
        // Uncomment below for testing
        // console.log(error)
      }
    );
  };

  // Run on pageload
  if($cookies.get('user')) {
    $scope.logged_user = JSON.parse($cookies.get('user'));

    $scope.logged_user_id = $scope.logged_user._id;
    console.log('logged_user_id : ' + $scope.logged_user_id);

  } else {
    window.location = '/';
  }
  if($scope.logged_user === undefined) {
    alert('Please Log in First!');
    window.location = '/';
  }

  if($scope.selected_activity_id >= 0) $scope.selectActivity($scope.selected_activity_id);
  $scope.getActivityList();


}]);
