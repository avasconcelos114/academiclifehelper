import angular from 'angular';
import uiRouter from 'angular-ui-router';
import signUpFormComponent from './signUpForm.component';

let signUpFormModule = angular.module('signUpForm', [
  uiRouter
])

.component('signUpForm', signUpFormComponent)

.name;

export default signUpFormModule;
