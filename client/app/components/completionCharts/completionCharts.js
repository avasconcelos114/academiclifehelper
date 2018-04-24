import angular from 'angular';
import uiRouter from 'angular-ui-router';
import completionChartsComponent from './completionCharts.component';

let completionChartsModule = angular.module('completionCharts', [
  uiRouter
])

.component('completionCharts', completionChartsComponent)

.name;

export default completionChartsModule;
