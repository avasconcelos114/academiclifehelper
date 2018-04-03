import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import CompanyInfo from './companyInfo/companyInfo'
import Contribute from './contribute/contribute'

let componentModule = angular.module('app.components', [
  Home,
  About,
  CompanyInfo,
  Contribute
])

.name;

export default componentModule;
