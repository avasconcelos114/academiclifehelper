app.controller('assignmentsController',
[
  '$scope',
  '$http',
  '$mdToast',
  '$timeout',
  '$mdSidenav',
  '$log',
  function(
    $scope,
    $http,
    $mdToast,
    $timeout,
    $mdSidenav,
    $log
  ){

  // initialized variables to be shown on screen
  $scope.assignments = [];
  $scope.assignment_due_dates = [];
  $scope.assignment_types = [];
  $scope.last_deleted_assignment = {};
  $scope.selected_type = 'all';
  $scope.selected_completion = 'all';
  // selected array values
  $scope.selected_activity_id = -1;

  //Receive selected_activity_id from activitiesController
  $scope.$watch('$parent.selected_activity_id', function(newValue, oldValue) {
    $scope.selected_activity_id = newValue;
    $scope.getAssignmentList()
  });

  // Assignment Controls
  $scope.getAssignmentList = function(){
    $scope.assignment_types     = [];
    $scope.assignment_due_dates = [];
    $http({
      method : 'GET',
      url    : '/api/' + $scope.selected_activity_id + '/assignments'
    })
    .then(
      function(success){
        $scope.assignments = success.data
        // create date array for datepicker & types
        for(i = 0; i <= success.data.length - 1; i++) {
          var date_object = { _id: success.data[i]._id, date : new Date(success.data[i].dueDate) }
          $scope.assignment_due_dates.push(date_object)

          var type_object = { _id: success.data[i]._id, type : success.data[i].type }
          $scope.assignment_types.push(type_object)
        }
      },
      function(error){
        // Uncomment below for testing
        // console.log(error)
      }
    )
  };

  $scope.searchAssignment = function() {
    $scope.assignment_types     = [];
    $scope.assignment_due_dates = [];
    if( $scope.search_input.length > 0) {
      $http({
        method : 'GET',
        url    : '/api/' + $scope.selected_activity_id + '/assignments/search/' + $scope.search_input
      })
      .then(
        function(success){
          $scope.assignments = success.data
          for(i = 0; i <= success.data.length - 1; i++) {
            var date_object = { _id: success.data[i]._id, date : new Date(success.data[i].dueDate) }
            $scope.assignment_due_dates.push(date_object)

            var type_object = { _id: success.data[i]._id, type : success.data[i].type }
            $scope.assignment_types.push(type_object)
          }
        },
        function(error){
          // Uncomment below for testing
          // console.log(error)
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
        // Uncomment below for testing
        // console.log(success)
      }, function (error) {
        // Uncomment below for testing
        // console.log(error)
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
      // Uncomment below for testing
      // console.log(success)
    }, function (error) {
      // Uncomment below for testing
      // console.log(error)
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
      // Uncomment below for testing
      // console.log(success)
    }, function (error) {
      // Uncomment below for testing
      // console.log(error)
    });
  }

  $scope.setType = function(assignment_id, index) {
    $http({
      method : 'PUT',
      url    : '/api/assignment/type/' + assignment_id,
      data   : { type : $scope.assignment_types[index].type }
    })
    .then(function (success) {
      // Update type on assignments array
      $scope.assignments[index].type = $scope.assignment_types[index].type
      // Uncomment below for testing
      // console.log(success)
    }, function (error) {
      // Uncomment below for testing
      // console.log(error)
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
        $scope.getAssignmentList()
        $scope.showActionToast()
        // Uncomment below for testing
        // console.log(success)
      },
      function(error){
        // Uncomment below for testing
        // console.log(error)
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
      return index;
    }
  };

  $scope.filterType = function(prop, val) {
    if($scope.selected_type === 'all') {
      return function(assignment){
        return true;
      }
    } else {
      return function(assignment){
        if (assignment[prop] === val) return true;
      }
    }
  }

  $scope.filterCompletion = function(prop, val) {
    if($scope.selected_completion === 'all') {
      return function(assignment){
        return true;
      }
    } else {
      return function(assignment){
        if (assignment[prop] === val) return true;
      }
    }
  }
  // Left panel toggle
  $scope.toggleLeft = buildDelayedToggler('left-panel');

  function debounce(func, wait, context) {
    var timer;

    return function debounced() {
      var context = $scope,
          args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }

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
          // Uncomment below for testing
          // console.log(success)
        }, function (error) {
          // Uncomment below for testing
          // console.log(error)
        });
      }
    });
  };
}]);
