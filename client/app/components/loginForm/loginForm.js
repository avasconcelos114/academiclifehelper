import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loginFormComponent from './loginForm.component';

let loginFormModule = angular.module('loginForm', [
  uiRouter
])

.component('loginForm', loginFormComponent)

.name;

export default loginFormModule;
