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
.config(function($routeProvider, $locationProvider, $mdThemingProvider) {
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
    
    $mdThemingProvider.theme("default")
});
