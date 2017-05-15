var app = angular.module('app', [ 'ngAnimate', 'ngAria', 'ngCookies', 'ngMaterial', 'ngMessages', 'materialCalendar', 'ngSanitize', 'ngRoute'] )

app.config(function($routeProvider, $locationProvider) {
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

    // configure html5 to get links working on jsfiddle
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
});

angular.module("app").config(function($mdThemingProvider) {
    $mdThemingProvider
        .theme("default")
});
