var ApiKey = '4e20d69c5b977193da2940fc47813cbc';
  // var ApiKey = 'd22669e556f9e536d2d4e73b6cb07813';
  // var ApiKey = '890f6487752c619e7b9ad1ca807eeff8';

function getRecipes(foodCatagory, callback) {
  
  var queryURL = 'https://www.food2fork.com/api/search?key=' + ApiKey + '&q=' + foodCatagory.toLowerCase();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  //   console.log('Recipes',response);
    callback(response);
  });

};
function getRecipe(recipeID, callback) {

  var queryURL = 'https://www.food2fork.com/api/get?key='+ ApiKey +'&rId=' + recipeID;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  //   console.log('Recipes',response);
    callback(response);
  });

  };