app.controller('activitiesController', [ '$scope', 'Activity', function($scope, Activity){

  // initialized arrays to be shown on screen
  $scope.activities = [];
  $scope.assignments = [];
  $scope.meetings = [];
  $scope.exams = [];
  $scope.completed_assignments = [];
  $scope.completed_meetings = [];
  $scope.completed_exams = [];

  // selected array values
  $scope.selectedActivityIndex = -1;

  // global input variables
  $scope.activity_input = "";
  $scope.showRepeatAlarmAssignment = false;
  $scope.showRepeatAlarmMeeting = false;
  $scope.showRepeatAlarmExam = false;

  // mobile input variables
  $scope.activity_li_class = "list-item"
  $scope.activity_selector_class = "bottom-selector-selected activity-icon-selected"
  $scope.task_selector_class = "bottom-selector task-icon"
  $scope.is_show_activity = true;
  $scope.is_show_task = false;

  // Activity Controls
  $scope.selectActivity = function(activity_name) {
    $scope.selectedActivityIndex = $scope.activities.indexOf(activity_name);

    $scope.assignments = $scope.activities[$scope.selectedActivityIndex].assignments;
    $scope.meetings = $scope.activities[$scope.selectedActivityIndex].meetings;
    $scope.exams = $scope.activities[$scope.selectedActivityIndex].exams;
  };

  $scope.addActivity = function(){
    $scope.activity = new Activity();
    if($scope.activity_input != "") {
      if($scope.activities.indexOf($scope.activity_input) == -1){

        $scope.activity.name = $scope.activity_input;
        $scope.activities.push($scope.activity);

        $scope.showRepeatAlarm = false;
        $scope.activity_input = "";
      } else {
        $scope.showRepeatAlarm = true;
      }
    }
  };

  $scope.removeActivity = function(activity_name){
    var index = $scope.activities.indexOf(activity_name);

    if (confirm("Would you like to remove this activity?")) {
      $scope.activities.splice(index, 1);
      $scope.assignments = [];
      $scope.meetings = [];
      $scope.exams = [];
      $scope.selectedActivityIndex = -1;
    }
  };

  // Assignment Controls
  $scope.addAssignment = function(){
    if($scope.assignment_input != "" || $scope.assignment_input === " ") {
      if($scope.assignments.indexOf($scope.assignment_input) == -1){

        $scope.assignments.push($scope.assignment_input);
        $scope.assignment_input = "";
        $scope.showRepeatAlarmAssignment = false;
      } else {
        $scope.showRepeatAlarmAssignment = true;
      }
    }
  };

  $scope.removeAssignment = function(assignment_name) {
    var index = $scope.assignments.indexOf(assignment_name);

    $scope.assignments.splice(index, 1);
  };

  $scope.completeAssignment = function(assignment_name) {
    // Remove from to-do assignment array
    var index = $scope.assignments.indexOf(assignment_name);
    $scope.assignments.splice(index, 1);
    // Add to completed assignment array
    $scope.completed_assignments.push(assignment_name);
  };

  // Meeting Controls
  $scope.addMeeting = function(){
    if($scope.meeting_input != "" || $scope.meeting_input === " ") {
      if($scope.meetings.indexOf($scope.meeting_input) == -1){

        $scope.meetings.push($scope.meeting_input);
        $scope.meeting_input = "";
        $scope.showRepeatAlarmMeeting = false;
      } else {
        $scope.showRepeatAlarmMeeting = true;
      }
    }
  };

  $scope.removeMeeting = function(meeting_name) {
    var index = $scope.meetings.indexOf(meeting_name);

    $scope.meetings.splice(index, 1);
  };

  $scope.completeMeeting = function(meeting_name) {
    // Remove from to-do assignment array
    var index = $scope.meetings.indexOf(meeting_name);
    $scope.meetings.splice(index, 1);
    // Add to completed assignment array
    $scope.completed_meetings.push(meeting_name);
  };

  // Exam Controls
  $scope.addExam = function(){
    if($scope.exam_input != "" || $scope.exam_input === " ") {
      if($scope.exams.indexOf($scope.exam_input) == -1){

        $scope.exams.push($scope.exam_input);
        $scope.exam_input = "";
        $scope.showRepeatAlarmExam = false;
      } else {
        $scope.showRepeatAlarmExam = true;
      }
    }
  };

  $scope.removeExam = function(exams_name) {
    var index = $scope.exams.indexOf(exams_name);

    $scope.exams.splice(index, 1);
  };

  $scope.completeExam = function(exam_name) {
    // Remove from to-do assignment array
    var index = $scope.exams.indexOf(exam_name);
    $scope.exams.splice(index, 1);
    // Add to completed assignment array
    $scope.completed_exams.push(exam_name);
  };

  // mobile control
  $scope.selectActivityMobile = function(activity_name) {
    $scope.selectedActivityIndex = $scope.activities.indexOf(activity_name);
    $scope.assignments = $scope.activities[$scope.selectedActivityIndex].assignments;

    // automatically toggles to tasks
    $scope.toggleSelectTask()
  }

  $scope.slideRightActivity = function(activity_id) {
    if (document.getElementById(activity_id).className === "slide-left") {
      document.getElementById(activity_id).className = ""
    } else {
      document.getElementById(activity_id).className = "slide-right";
    }
  };

  $scope.SlideLeftActivity = function(activity_id) {
    if (document.getElementById(activity_id).className === "slide-right") {
      document.getElementById(activity_id).className = ""
    } else {
      document.getElementById(activity_id).className = "slide-left";
    }
  };

  $scope.removeActivityMobile = function(activity_name) {
    var index = $scope.activities.indexOf(activity_name);

    if (confirm("Would you like to remove this activity?")) {
      $scope.activities.splice(index, 1);
      $scope.assignments = [];
      $scope.meetings = [];
      $scope.exams = [];
      $scope.selectedActivityIndex = -1;
    }
  };

  $scope.toggleSelectActivity = function() {
    $scope.activity_selector_class = "bottom-selector-selected activity-icon-selected";
    $scope.task_selector_class = "bottom-selector task-icon";

    $scope.is_show_activity = true;
    $scope.is_show_task = false;
  }

  $scope.toggleSelectTask = function() {
    // Toggle css styles
    $scope.activity_selector_class = "bottom-selector activity-icon";
    $scope.task_selector_class = "bottom-selector-selected task-icon-selected";

    // toggle html element view
    $scope.is_show_activity = false;
    $scope.is_show_task = true;
  }

}]);
