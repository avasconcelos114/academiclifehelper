app.controller('activitiesMobileController', [ '$scope', 'Activity', 'activityService', function($scope, Activity, activityService){

  // initialized arrays to be shown on screen
  $scope.activities = [];
  $scope.assignments = [];

  // selected array values
  $scope.selected_activity_index = -1;

  // global input variables
  $scope.activity_input = "";

  // mobile input variables
  $scope.activity_li_class = "list-item"
  $scope.activity_selector_class = "bottom-selector-selected activity-icon-selected"
  $scope.task_selector_class = "bottom-selector task-icon"
  $scope.is_show_activity = true;
  $scope.is_show_task = false;





  // mobile control
  $scope.selectActivityMobile = function(activity_name) {
    $scope.selected_activity_index = $scope.activities.indexOf(activity_name);
    $scope.assignments = $scope.activities[$scope.selected_activity_index].assignments;

    // automatically toggles to tasks
    $scope.toggleSelectTask()
  }

  $scope.addActivity = function(){
    $scope.activity = new Activity();
    if($scope.activity_input != "") {
      if($scope.activities.indexOf($scope.activity_input) == -1){
        $scope.activity.name = $scope.activity_input;
        $scope.activities.push($scope.activity);
        $scope.activity_input = "";
      }
    }
  };

  $scope.removeActivity = function(activity_name) {
    var index = $scope.activities.indexOf(activity_name);

    if (confirm("Would you like to remove this activity?")) {
      $scope.activities.splice(index, 1);
      // $scope.assignments = [];
      // $scope.meetings = [];
      // $scope.exams = [];
      // $scope.selected_activity_index = -1;
    }
  };

  $scope.toggleSelectActivity = function() {
    $scope.activity_selector_class = "bottom-selector-selected activity-icon-selected";
    $scope.task_selector_class = "bottom-selector task-icon";
    $scope.is_show_activity = true;
    $scope.is_show_task = false;
  }

  $scope.toggleSelectTask = function() {
    $scope.activity_selector_class = "bottom-selector activity-icon";
    $scope.task_selector_class = "bottom-selector-selected task-icon-selected";
    $scope.is_show_activity = false;
    $scope.is_show_task = true;
  }

  $scope.addAssignment = function(){
    if($scope.assignment_input != "" || $scope.assignment_input === " ") {
      if($scope.assignments.indexOf($scope.assignment_input) == -1){
        var input_object = { name: $scope.assignment_input, status: "ACTIVE" }
        $scope.assignments.push(input_object);
        $scope.assignment_input = "";
        $scope.show_repeat_alarm_assignment = false;
      } else {
        $scope.show_repeat_alarm_assignment = true;
      }
    }
  };

  $scope.completeAssignment = function(assignment_name, activity_id) {
    var index = $scope.assignments.indexOf(assignment_name);

    $scope.assignments[index].status = "COMPLETED";
    $scope.slideRightActivity(activity_id);
  };

  $scope.removeAssignment = function(assignment_name) {
    var index = $scope.assignments.indexOf(assignment_name);
    console.log(index)
    $scope.assignments.splice(index, 1);
  }

  $scope.slideRightActivity = function(activity_id) {
    if (document.getElementById(activity_id).className === "slide-left") {
      document.getElementById(activity_id).className = ""
    } else {
      document.getElementById(activity_id).className = "slide-right";
    }
  };

  $scope.SlideLeftActivity = function(activity_id) {
    console.log('activity_id: ' + activity_id)
    if (document.getElementById(activity_id).className === "slide-right") {
      document.getElementById(activity_id).className = ""
    } else {
      document.getElementById(activity_id).className = "slide-left";
    }
  };
}]);
