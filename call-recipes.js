function getRecipes(foodCatagory) {

var queryURL = "https://www.food2fork.com/api/search?key=d22669e556f9e536d2d4e73b6cb07813&q=" + foodCatagory.toLowerCase();
var recipes;
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
//   console.log('Recipes',response);
  recipes = response;
});
return recipes;
};