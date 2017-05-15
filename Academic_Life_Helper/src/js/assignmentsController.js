app.controller('assignmentsController',
[
  '$scope',
  '$http',
  '$mdToast',
  '$timeout',
  '$filter',
  'MaterialCalendarData',
  '$mdSidenav',
  '$mdDialog',
  '$log',
  '$sanitize',
  function(
    $scope,
    $http,
    $mdToast,
    $timeout,
    $filter,
    MaterialCalendarData,
    $mdSidenav,
    $mdDialog,
    $log,
    $sanitize
  ){

  // initialized variables to be shown on screen
  $scope.currentNavItem = window.location.pathname.split('/')[1];
  $scope.titleArray = [];
  // $scope.assignments = [];
  $scope.assignment_due_dates = [];
  $scope.assignment_types = [];
  $scope.last_deleted_assignment = {};
  $scope.selected_type = 'all';
  $scope.selected_completion = 'all';
  // selected array values
  $scope.selected_activity_id = $scope.$parent.selected_activity_id;

  //Receive selected_activity_id from activitiesController
  $scope.$watch('$parent.selected_activity_id', function(newValue, oldValue) {
    $scope.selected_activity_id = newValue;
    $scope.getAssignmentList();
    $scope.currentNavItem = 'classes'
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
      // handleOnClick(success)
    }, function (error) {
      // Uncomment below for testing
      // handleOnClick(error)
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
      // handleOnClick(success)
    }, function (error) {
      // Uncomment below for testing
      // handleOnClick(error)
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
        // handleOnClick(success)
      },
      function(error){
        // Uncomment below for testing
        // handleOnClick(error)
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

  $scope.checkDateStatus = function(assignment) {
    var currentDateUnix = new Date().getTime() / 1000;
    var thisDateUnix = new Date(assignment.dueDate).getTime() / 1000;
    var currentDate =  $filter("date")(new Date(), "yyyyMMdd")
    var thisDate =  $filter("date")(assignment.dueDate, "yyyyMMdd")
    if (currentDate > thisDate) {
      if(assignment.completedYn === 'Y') {
        return 'datepicker-area'
      } else {
        return 'datepicker-area duedate-overdue'
      }
    }  else if (currentDate === thisDate) {
      return 'datepicker-area duedate-warning'
    } else {
      return 'datepicker-area'
    }

  }

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
  // Right panel toggle
  $scope.toggleRight = function(){
    $mdSidenav('rightPanel').toggle()
  }
  $scope.toggleRight()
  function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
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


// Calendar Controls
    $scope.selectedDate = null;
    $scope.firstDayOfWeek = 0;

    function showDialog($event) {
       var parentEl = angular.element(document.body);
       var titleList = $scope.titleArray[$scope.titleArray.findIndex(x => x.date === $scope.selectedDate)].titles;
       var dateComponent = [];

       for(var i = 0; i <= titleList.length - 1; i++){
         dateComponent.push('<div class="date_item">' + titleList[i] + '</div>')
       }
       $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         template:
           '<md-dialog aria-label="List dialog">' +
           '<md-toolbar class="dialog-header">' +
             '<div class="md-toolbar-tools">' +
               '<h2>'+ $scope.selectedDate + '</h2>' +
               '<span flex></span>' +
             '</div>' +
           '</md-toolbar>' +
           '  <md-dialog-content>'+
           '    <md-list>'+
                  dateComponent.join('') +
           '    </md-list>'+
           '  </md-dialog-content>' +
           '  <md-dialog-actions>' +
           '    <md-button ng-click="closeDialog()" class="md-primary">' +
           '      Close Dialog' +
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
      }
    }

    $scope.showDayContents = function(ev) {
      var titleList = $scope.titleArray[$scope.titleArray.findIndex(x => x.date === $scope.selectedDate)].titles;
      dateComponent = [];
      for(var i = 0; i <= titleList.length - 1; i++){
        dateComponent.push('<div class="date_item">' + titleList[i] + '</div>')
      }


    };

    $scope.dayClick = function(date) {
      $scope.selectedDate = $filter("date")(date, "yyyy-MM-dd");
      showDialog();
    };

    $scope.setContentViaService = function(date, title) {
      dateComponent = [];
      for(var i = 0; i <= title.length - 1; i++){
        dateComponent.push('<div class="date_item">' + title[i] + '</div>')
      }

      MaterialCalendarData.setDayContent(date, dateComponent.join('') )
    }

    $scope.setDayContent = function(date) {
      MaterialCalendarData.setDayContent(date, '<div> </div>' );
      var title = [];
      for(var j = 0; j <= $scope.assignments.length - 1; j++) {
        if($filter("date")(date, "yyyy-MM-dd") == $scope.assignments[j].dueDate.substring(0, 10)){
          title.push($scope.assignments[j].title)
        }
      }

      $scope.titleArray.push({ date : $filter("date")(date, "yyyy-MM-dd"), titles : title });

      $scope.setContentViaService(date, title)
    };

}]);
