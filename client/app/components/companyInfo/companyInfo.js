import angular from 'angular';
import uiRouter from 'angular-ui-router';
import companyInfoComponent from './companyInfo.component';

let companyInfoModule = angular.module('companyInfo', [
  uiRouter
])

.component('companyInfo', companyInfoComponent)

.name;

export default companyInfoModule;
