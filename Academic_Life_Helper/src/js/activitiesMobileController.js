app.controller('activitiesMobileController', ['$scope', '$http',function($scope, $http){

  // initialized arrays to be shown on screen
  $scope.activities = [];
  $scope.assignments = [];
  $scope.assignment_due_dates = [];
  $scope.assignment_types = [];
  $scope.last_deleted_assignment = {};
  $scope.selected_type = 'all';
  $scope.selected_completion = 'all';
  // selected array values
  $scope.selected_activity_id = -1;
  // global input variables
  $scope.activity_input = "";

  // mobile input variables
  $scope.activity_li_class = "list-item";
  $scope.activity_selector_class = "bottom-selector-selected activity-icon-selected";
  $scope.assignment_selector_class = "bottom-selector assignment-icon";
  $scope.is_show_activity = true;
  $scope.is_show_assignment = false;

  // mobile control
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

  $scope.selectActivityMobile = function(activity_id) {
    $scope.selected_activity_id = activity_id;

    $scope.getAssignmentList()
    // automatically toggles to assignments
    $scope.toggleSelectAssignment();
  }

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

  $scope.removeActivity = function(activity_name) {
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

  $scope.toggleSelectActivity = function() {
    $scope.activity_selector_class = "bottom-selector-selected activity-icon-selected";
    $scope.assignment_selector_class = "bottom-selector assignment-icon";
    $scope.is_show_activity = true;
    $scope.is_show_assignment = false;
  }

  $scope.toggleSelectAssignment = function() {
    $scope.activity_selector_class = "bottom-selector activity-icon";
    $scope.assignment_selector_class = "bottom-selector-selected assignment-icon-selected";
    $scope.is_show_activity = false;
    $scope.is_show_assignment = true;
  }

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

  $scope.setCompletedYn = function(assignment_id, value) {
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
  };

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

  $scope.removeAssignment = function(assignment_name) {
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
  }

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

  $scope.slideRightActivity = function(id) {
    if (document.getElementById(id).className === "slide-left") {
      document.getElementById(id).className = ""
    } else {
      document.getElementById(id).className = "slide-right";
    }
  };

  $scope.SlideLeftActivity = function(id) {
    console.log('activity_id: ' + id)
    if (document.getElementById(id).className === "slide-right") {
      document.getElementById(id).className = ""
    } else {
      document.getElementById(id).className = "slide-left";
    }
  };
}]);
