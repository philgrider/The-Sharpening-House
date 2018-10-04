
function getRecipes(foodCatagory, callback) {

  var queryURL = "https://www.food2fork.com/api/search?key=890f6487752c619e7b9ad1ca807eeff8&q=" + foodCatagory.toLowerCase();

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  //   console.log('Recipes',response);
    callback(response);
  });

};
function getRecipe(recipieID, callback) {

  var queryURL = "https://www.food2fork.com/api/get?key=890f6487752c619e7b9ad1ca807eeff8&rId=" + recipieID;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
  //   console.log('Recipes',response);
    callback(response);
  });

  };