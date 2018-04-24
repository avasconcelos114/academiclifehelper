import angular from 'angular';
import uiRouter from 'angular-ui-router';
import signUpComponent from './signUp.component';

let signUpModule = angular.module('signUp', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('signUp', {
      url: '/signUp',
      component: 'signUp'
    });
})

.component('signUp', signUpComponent)

.name;

export default signUpModule;
