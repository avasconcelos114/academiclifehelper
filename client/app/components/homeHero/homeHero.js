import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeHeroComponent from './homeHero.component';

let homeHeroModule = angular.module('homeHero', [
  uiRouter
])

.component('homeHero', homeHeroComponent)

.name;

export default homeHeroModule;
