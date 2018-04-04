import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import CompanyInfo from './companyInfo/companyInfo'
import Contribute from './contribute/contribute'
import HomeHero from './homeHero/homeHero'

let componentModule = angular.module('app.components', [
  Home,
  About,
  CompanyInfo,
  Contribute,
  HomeHero
])

.name;

export default componentModule;
