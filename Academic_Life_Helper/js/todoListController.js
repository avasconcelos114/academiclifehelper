app.controller('todoListController', function($scope){
  $scope.tasks = [];

  $scope.task_input = "";
  $scope.showRepeatAlarm = false;


  $scope.autoAddTask = function(){
    if($scope.task_input != '') {
      if($scope.tasks.indexOf($scope.task_input) == -1){
        $scope.tasks.push($scope.task_input);
        $scope.showRepeatAlarm = false;
        $scope.task_input = "";
      } else {
        $scope.showRepeatAlarm = true;
      }
    }
  }
});
