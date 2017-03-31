angular.module('app', ['ngRoute'])

.controller('TestController', function($scope, $route, $routeParams, $location){

    $scope.route = $route;
    $scope.location = $location;
    $scope.routeParams = $routeParams;

})

.controller('InicialController', function($scope){
  console.log('InicialController Loaded')
})
.controller('Pagina1Controller', function($scope){
  console.log('Pagina1Controller Loaded')
})
.controller('Pagina2Controller', function($scope){
  console.log('Pagina2Controller Loaded')
})
.config(function($routeProvider, $locationProvider){

    $routeProvider
    .when('/Inicial', {
      templateUrl : 'testInicial.html',
      controller: 'InicialController'
    })
    .when('/Pagina1', {
      templateUrl : 'testPagina1.html',
      controller: 'Pagina1Controller'
    })
    .when('/Pagina2', {
      templateUrl : 'testPagina2.html',
      controller: 'Pagina2Controller'
    })
    .otherwise({
      redirectTo: '/Inicial'
    });

    $locationProvider.html5Mode(true);
});
