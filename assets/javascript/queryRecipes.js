// dont forget the document ready
// get DOM Tags
var recipeDataStore = {};
var $recipesDisplay = $('#recipe-query-results');

$('#search-input-btn').on('click', function(event) {
    event.preventDefault();
    // grab the items
var $recipeType = $('#search-input').val();

getRecipes($recipeType,updateDOM); 

});
function updateDOM (recipes) {
    recipeDataStore = JSON.parse(recipes);
    console.log('Chicken Recipies', (recipeDataStore));
    var $headerResults = $('<h4>')
        .addClass('text-center border-bottom')
        .text('Your Results!');
        //create the Search Resuls
    $recipesDisplay.append($headerResults);
    console.log($recipesDisplay);
    // Loop thru all the results
    for (i = 0; i < recipeDataStore.count; i++) {
        if(i % 2){
            var $cardDiv = $('<div>').attr({
                class: 'card mb-2',
                id: 'card-width'
            });   
        }else{
            var $cardDiv = $('<div>').attr({
                class: 'card mb-2 mr-sm-0 mr-md-0 mr-lg-2 float-lg-left float-md-none float-sm-none',
                id: 'card-width'
            }); 
        }
        var $cardImg = $('<img>').attr({
            class: 'card-img-top',
            'src': recipeDataStore.recipes[i].image_url,
            'alt': 'Card image cap',
            'id': 'img-width'
        });
        var $cardBodyContainer = $('<div>').addClass('card-body');
        var $pCard = $('<p>').addClass('card-text text-center').text(recipeDataStore.recipes[i].title);
        $cardBodyContainer.append($pCard);
        $cardDiv.append($cardImg, $cardBodyContainer);
        $recipesDisplay.append($cardDiv);
    }


  }
  function updateDOM2 (recipe) {
     console.log('recipie', (recipe));
      // recipes = the JSON you returned in call-recipe.js
  };
//   getRecipe('35120', updateDOM2);
