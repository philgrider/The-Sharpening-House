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
    $recipesDisplay.empty();
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
            'alt': 'Card image cp',
            'id': 'img-width'
        });
        var $cardBodyContainer = $('<div>').addClass('card-body');
        var $pCard = $('<p>').addClass('card-text text-center').text(recipeDataStore.recipes[i].title);
        var $recipeDrop = $('<div>').addClass('drop-container');
        $recipeDrop.append($('<span>').addClass('button').attr({'id':'drop-button','data-recipe-id': recipeDataStore.recipes[i].recipe_id}).text('+'));
        var $ingredientsDiv = $('<div>').addClass('drop-content');
        $ingredientsDiv.append($('<div>').addClass('drop-head').html('<h3>' + recipeDataStore.recipes[i].title + '</h3>'));
        var $dropBody = $('<div>').addClass('drop-body');
        $dropBody.append($('<div>').attr({
                    class: 'list-group',
                    'data-spy': 'scroll',
                    'id': recipeDataStore.recipes[i].recipe_id,
                    'data-offset': '0'
        }));
        $ingredientsDiv.append($dropBody);
        $recipeDrop.append($ingredientsDiv);
        $cardBodyContainer.append($pCard);
        $cardDiv.append($cardImg, $cardBodyContainer, $recipeDrop);
        $recipesDisplay.append($cardDiv);
    }
  }
  $('#recipe-query-results').unbind('click').on('click', '.button',function (event) {
    event.preventDefault();
    $(this).parent().toggleClass('expand');
    $(this).parent().children().toggleClass('expand');
    var recipeId = $(this).attr('data-recipe-id');
    var btnState = $(this).attr('class');
    console.log('This should be the Recipe ID' + recipeId);
    console.log('this is btn state: ' + btnState);
    if(btnState === 'button expand'){
    getRecipe(recipeId, ingredients);
    }

  });
  function ingredients (recipeIngredients) {
    
     console.log('recipie', (JSON.parse(recipeIngredients)));

      // recipeIngredients = the JSON you returned in call-recipe.js

      // update DOM with ingredients for this expand
      
     var $ingredientsDiv = $('#ingredientsUpdate');
      
  };
//   getRecipe('35120', updateDOM2);
