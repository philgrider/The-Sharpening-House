function getRecipe(recipieID, callback) {

var queryURL = "./First-Recipe.JSON";

$.getJSON( queryURL, function ( response ) {
  // console.log('type of response', typeof response);
  // console.log('Recipe',JSON.stringify(response));

  if (typeof response === 'string') {
    response = JSON.parse(response);
  }

  callback(response);
});
};