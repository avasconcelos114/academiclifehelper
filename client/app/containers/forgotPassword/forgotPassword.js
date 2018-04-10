import angular from 'angular';
import uiRouter from 'angular-ui-router';
import forgotPasswordComponent from './forgotPassword.component';

let forgotPasswordModule = angular.module('forgotPassword', [
  uiRouter
])

.component('forgotPassword', forgotPasswordComponent)

.name;

export default forgotPasswordModule;
