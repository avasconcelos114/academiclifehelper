app.controller('indexController', [ '$scope', 'Person', function($scope){

  $scope.selectedSheet = "index-light";

  $scope.changeCss = function(sheet){
    $scope.selectedSheet = sheet;
    console.log($scope.selectedSheet)
  }
  console.log('Controller indexController Initialized');


}]).directive('ngEnter', function() {
    return function(scope, elem, attrs) {
      elem.bind("keydown keypress", function(event) {
        // 13 represents enter button
        if (event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
  });
