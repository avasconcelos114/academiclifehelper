(function() {
    'use strict';

    angular
    .module('app')
    .controller('calendarController', CalendarController);

    CalendarController.$inject = [
        '$scope',
        '$http',
        '$route',
        'MaterialCalendarData',
        '$filter',
        '$timeout',
        '$mdDialog'
    ];

    function CalendarController(
        $scope,
        $http,
        $route,
        MaterialCalendarData,
        $filter,
        $timeout,
        $mdDialog
    ) {
        // Calendar Controls
        $scope.selectedDate = null;
        $scope.firstDayOfWeek = 0;

        function showDialog($event) {
         let parentEl = angular.element(document.body);
         let titleList = $scope.titleArray[$scope.titleArray.findIndex(x => x.date === $scope.selectedDate)].titleList;

         let dateComponent = [];

         for(var i = 0; i <= titleList.length - 1; i++){
           if(titleList[i].completedYn === 'Y') dateComponent.push('<div class="date-item-completed">' + titleList[i].title + '</div>')
           else dateComponent.push('<div class="date-item">' + titleList[i].title + '</div>')
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

        $scope.dayClick = function(date) {
            $scope.selectedDate = $filter("date")(date, "yyyy-MM-dd");
            
            if($scope.titleArray[$scope.titleArray.findIndex(x => x.date === $scope.selectedDate)].titleList.length > 0)
            showDialog();
        };

        $scope.showDayContents = function(ev) {
            let titleList = $scope.titleArray[$scope.titleArray.findIndex(x => x.date === $scope.selectedDate)].titleList;
            dateComponent = [];
            for(var i = 0; i <= titleList.length - 1; i++){
                if(titleList[i].completedYn === 'Y') {
                    dateComponent.push('<div class="date-item-completed">' + titleList[i].title + '</div>')
                } else {
                    dateComponent.push('<div class="date-item">' + titleList[i].title + '</div>')
                }
            }
        };


        $scope.setContentViaService = function(date, titleList) {
            let dateComponent = [];
            for(var i = 0; i <= titleList.length - 1; i++){
                if(titleList[i].completedYn === 'Y') {
                    dateComponent.push('<div class="date-item-completed">' + titleList[i].title + '</div>')
                } else {
                    dateComponent.push('<div class="date-item">' + titleList[i].title + '</div>')
                }
            }
            MaterialCalendarData.setDayContent(date, dateComponent.join('') )
        }

        $scope.setDayContent = function(date) {
            $timeout( function(){
                MaterialCalendarData.setDayContent(date, '<div> </div>' );
                let titleList = [];
                for(var j = 0; j <= $scope.$parent.assignments.length - 1; j++) {
                    if($filter("date")(date, "yyyy-MM-dd") == $scope.$parent.assignments[j].dueDate.substring(0, 10)){
                        titleList.push({ title : $scope.$parent.assignments[j].title, completedYn: $scope.$parent.assignments[j].completedYn })
                    }
                }
                $scope.titleArray.push({ date : $filter("date")(date, "yyyy-MM-dd"), titleList : titleList  });
                $scope.setContentViaService(date, titleList)
            }, 140 );
        };
    }
})();
