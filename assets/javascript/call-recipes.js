
function getRecipes(foodCatagory, callback) {
  var vitaApiKey = 'd22669e556f9e536d2d4e73b6cb07813';
  // var philApiKey = '890f6487752c619e7b9ad1ca807eeff8';
  var queryURL = 'https://www.food2fork.com/api/search?key=' + vitaApiKey + '&q=' + foodCatagory.toLowerCase();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  //   console.log('Recipes',response);
    callback(response);
  });

};
function getRecipe(recipeID, callback) {

  var queryURL = "https://www.food2fork.com/api/get?key=890f6487752c619e7b9ad1ca807eeff8&rId=" + recipeID;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  //   console.log('Recipes',response);
    callback(response);
  });

  };