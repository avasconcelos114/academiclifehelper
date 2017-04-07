app.factory('Activity', function(){
  var Activity = function(){
    this.name = "";
    this.assignments = [];
    this.exams = [];
    this.meetings = [];
    this.completed_assignments = [];
    this.completed_exams = [];
    this.completed_meetings = [];
  }

  return Activity
});
