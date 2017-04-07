app.service('operations', function(){

  console.log('Operations Service Started');

  this.sum = function(value1, value2){
    return value1 + value2;
  };

  this.subtraction = function(value1, value2){
    return value1 - value2;
  };

});
