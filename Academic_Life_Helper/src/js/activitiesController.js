app.controller('activitiesController',
[
  '$scope',
  '$http',
  '$cookies',
  '$location',
  function(
    $scope,
    $http,
    $cookies,
    $location
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
    $scope.selected_activity_id = activity_id;
    $cookies.put('selected_activity_id', activity_id);
    $location.path('classes');

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

  $scope.removeActivity = function(activity_id){
    if (confirm("Would you like to remove this activity?")) {
      $http({
        method : 'DELETE',
        url    : '/api/activity/' + activity_id
      })
      .then(
        function(success){

          $scope.getActivityList()
          $scope.removeAssignmentFromActivity(activity_id)
          $scope.selected_activity_id = -1;
          // Uncomment below for testing
          // console.log(success)
        },
        function(error){
          // Uncomment below for testing
          // console.log(error)
        }
      );
    }
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
