app.controller('activitiesController', [ '$scope', 'Activity', 'activityService', '$http', '$mdToast', function($scope, Activity, activityService, $http, $mdToast){

  // initialized variables to be shown on screen
  $scope.activities = [];
  $scope.assignments = [];
  $scope.assignment_due_dates = [];
  $scope.last_deleted_assignment = {};
  // selected array values
  $scope.selected_activity_id = -1;

  // Activity Controls
  $scope.getActivityList = function(){
    $http.get('/api/activities')
    .then(
      function(response){
        $scope.activities = response.data
        console.log($scope.activities)
      },
      function(response){
        console.log(response)
      }
    )
  }

  // Call on pageload
  $scope.getActivityList()

  $scope.selectActivity = function(activity_id) {
    $scope.selected_activity_id = activity_id
    $scope.getAssignmentList()
  };

  $scope.addActivity = function(){
    if($scope.activity_input != "") {
      $http({
        method : 'POST',
        url    : '/api/activity',
        data   : { title : $scope.activity_input}
      })
      .then(function (success) {
        $scope.getActivityList()
        $scope.activity_input = "";
        console.log(success)
      }, function (error) {
        console.log(error)
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
          console.log(success)
          $scope.getActivityList()
          $scope.removeAssignmentFromActivity(activity_id)
          $scope.selected_activity_id = -1;
        },
        function(error){
          console.log(error)
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
        console.log(success)
      },
      function(error){
        console.log(error)
      }
    );
  };

  // Assignment Controls
  $scope.getAssignmentList = function(){
    $http({
      method : 'GET',
      url    : '/api/' + $scope.selected_activity_id + '/assignments'
    })
    .then(
      function(response){
        $scope.assignments = response.data
        // create date array for datepicker
        for(i = 0; i <= response.data.length; i++) {
          var date_object = { _id: response.data[i]._id, date : new Date(response.data[i].dueDate) }
          $scope.assignment_due_dates.push(date_object)
        }
      },
      function(response){
        console.log(response)
      }
    )
  };

  $scope.searchAssignment = function() {
    if( $scope.search_input.length > 0) {
      $http({
        method : 'GET',
        url    : '/api/assignments/search/' + $scope.search_input
      })
      .then(
        function(response){
          $scope.assignments = response.data
          for(i = 0; i <= response.data.length; i++) {
            var date_object = { _id: response.data[i]._id, date : new Date(response.data[i].dueDate) }
            $scope.assignment_due_dates.push(date_object)
          }
        },
        function(response){
          console.log(response)
        }
      )
    } else {
      $scope.getAssignmentList()
    }
  };

  $scope.addAssignment = function(){
    if($scope.assignment_input.length > 0) {
      $http({
        method : 'POST',
        url    : '/api/' + $scope.selected_activity_id + '/assignment',
        data   : { title : $scope.assignment_input }
      })
      .then(function (success) {
        $scope.getAssignmentList()
        $scope.assignment_input = "";
        console.log(success)
      }, function (error) {
        console.log(error)
      });
    }
  };

  $scope.setAssignmentDueDate = function(assignment_id, index) {
    $http({
      method : 'PUT',
      url    : '/api/assignment/date/' + assignment_id,
      data   : { dueDate : $scope.assignment_due_dates[index].date}
    })
    .then(function (success) {
      $scope.getAssignmentList()
      console.log(success)
    }, function (error) {
      console.log(error)
    });
  }

  $scope.setCompletedYn = function(assignment_id, value){
    $http({
      method : 'PUT',
      url    : '/api/assignment/status/' + assignment_id,
      data   : { completedYn : value === 'N' ? 'Y' : 'N' }
    })
    .then(function (success) {
      $scope.getAssignmentList()
      console.log(success)
    }, function (error) {
      console.log(error)
    });
  }

  $scope.setType = function(assignment_id, value) {
    $http({
      method : 'PUT',
      url    : '/api/assignment/type/' + assignment_id,
      data   : { type : value }
    })
    .then(function (success) {
      $scope.getAssignmentList()
      console.log(success)
    }, function (error) {
      console.log(error)
    });
  }

  $scope.removeAssignment = function(assignment_id) {
    $scope.last_deleted_assignment = $scope.assignments[$scope.findIndexById('assignment', assignment_id)]

    $http({
      method : 'DELETE',
      url    : '/api/assignment/' + assignment_id
    })
    .then(
      function(success){
        console.log(success)
        $scope.getAssignmentList()
        $scope.showActionToast()
      },
      function(error){
        console.log(error)
      }
    );
  };

  //utils
  $scope.findDateById = function(type, id) {
    if (type === 'assignment' ){
      var index = $scope.assignment_due_dates.findIndex(x => x._id === id)
      return index;
    }
  };

  $scope.findIndexById = function(type, id) {
    if(type === 'activity') {
      var index = $scope.activities.findIndex(x => x._id === id)
      return index;
    } else if (type === 'assignment') {
      var index = $scope.assignments.findIndex(x => x._id === id)
      return index
    }

  };

  // Assignment undo toast
  var last = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }

  $scope.showActionToast = function() {
    var pinTo = $scope.getToastPosition();
    var toast = $mdToast.simple()
      .textContent('Assignment Deleted!')
      .action('UNDO')
      .hideDelay(9000)
      .highlightAction(true)
      .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
      .position(pinTo);

    $mdToast.show(toast).then(function(response) {
      if ( response == 'ok' ) {
        $http({
          method : 'POST',
          url    : '/api/' + $scope.selected_activity_id + '/assignment',
          data   : {
            title       : $scope.last_deleted_assignment.title,
            type        : $scope.last_deleted_assignment.type,
            completedYn : $scope.last_deleted_assignment.completedYn,
            dueDate     : $scope.last_deleted_assignment.dueDate,
          }
        })
        .then(function (success) {
          $scope.getAssignmentList()
          console.log(success)
        }, function (error) {
          console.log(error)
        });
      }
    });
  };
}]);
