import angular from 'angular';
import uiRouter from 'angular-ui-router';
import calendarComponent from './calendar.component';

let calendarModule = angular.module('calendar', [
  uiRouter
])

.component('calendar', calendarComponent)

.name;

export default calendarModule;
