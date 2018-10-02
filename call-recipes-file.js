function getRecipes(foodCatagory) {

var queryURL = "/Users/phillipgrider 1 2/Desktop/Bootcamp/The-Sharpening-House/chicken.JSON";
var recipes;
$.getJSON( queryURL, function( response ) {
  console.log('Recipes',response);
  recipes = response;
});
return recipes;
};