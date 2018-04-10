import angular from 'angular';
import uiRouter from 'angular-ui-router';
import signUpComponent from './signUp.component';

let signUpModule = angular.module('signUp', [
  uiRouter
])

.component('signUp', signUpComponent)

.name;

export default signUpModule;
