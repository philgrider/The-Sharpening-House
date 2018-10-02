function getRecipe(recipieID) {

var queryURL = "./call-recipe-file";
var recipie;
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  // console.log('Recipe',response);
  recipie = response; 
});
return recipie;
};