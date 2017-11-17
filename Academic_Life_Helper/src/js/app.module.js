angular
.module('app', [ 
    'ngAnimate', 
    'ngAria', 
    'ngCookies', 
    'ngMaterial', 
    'ngMessages', 
    'materialCalendar', 
    'ngSanitize', 
    'ngRoute'])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/classes", {
        templateUrl : "/src/assignments.html",
        controller: 'assignmentsController'
    })
    .when("/calendar", {
        templateUrl : "/src/calendar.html",
        controller: 'assignmentsController'
    })
    .when("/dashboard", {
        templateUrl : "/src/dashboard.html",
        controller: 'assignmentsController'
    })

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
});

angular.module("app").config(function($mdThemingProvider) {
    $mdThemingProvider
        .theme("default")
});
