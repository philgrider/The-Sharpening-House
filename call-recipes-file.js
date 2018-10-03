function getRecipes(foodCatagory, callback) {

  var queryURL = "./chicken.JSON";

  $.getJSON( queryURL, function ( response ) {
    // console.log('type of response', typeof response);
    // console.log('Recipes',JSON.stringify(response));

    if (typeof response === 'string') {
      response = JSON.parse(response);
    }

    callback(response);
  });

};