app.factory('Person', function(){
  console.log("Person Factory Initialized");

  var Person = function(){
    console.log("Person Object Initialized");
    this.name = "";

  }

  return Person
});
