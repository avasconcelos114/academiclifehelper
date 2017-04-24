app.controller('activitiesController',
[
  '$scope',
  '$http',
  function(
    $scope,
    $http
  ){

  // initialized variables to be shown on screen
  $scope.activities = [];

  // selected array values
  $scope.selected_activity_id = -1;

  // Activity Controls
  $scope.getActivityList = function(){
    $http.get('/api/activities')
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
  }

  // Call on pageload
  $scope.getActivityList()

  $scope.selectActivity = function(activity_id) {
    $scope.selected_activity_id = activity_id
  };

  $scope.addActivity = function(){
    if($scope.activity_input.length > 0) {
      $http({
        method : 'POST',
        url    : '/api/activity',
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
}]);
