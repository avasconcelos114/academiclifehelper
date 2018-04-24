import angular from 'angular';
import uiRouter from 'angular-ui-router';
import upcomingActivitiesComponent from './upcomingActivities.component';

let upcomingActivitiesModule = angular.module('upcomingActivities', [
  uiRouter
])

.component('upcomingActivities', upcomingActivitiesComponent)

.name;

export default upcomingActivitiesModule;
