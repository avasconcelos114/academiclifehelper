import angular from 'angular';
import uiRouter from 'angular-ui-router';
import completionCounterComponent from './completionCounter.component';

let completionCounterModule = angular.module('completionCounter', [
  uiRouter
])

.component('completionCounter', completionCounterComponent)

.name;

export default completionCounterModule;
