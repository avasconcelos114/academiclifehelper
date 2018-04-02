import angular from 'angular';
import uiRouter from 'angular-ui-router';
import contributeComponent from './contribute.component';

let contributeModule = angular.module('contribute', [
  uiRouter
])

.component('contribute', contributeComponent)

.name;

export default contributeModule;
