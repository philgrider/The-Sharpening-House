    // dont forget the document ready
    // get DOM Tags / Global Variables
    var recipeDataStore = {};
    var recipeIngredientsStore = {};
    var $recipesDisplay = $('#recipe-query-results');
    var textDataStore = '';

    
    $('#search-input-btn').on('click', function (event) {
        event.preventDefault();

        // grab the items
        var $recipeType = $('#search-input').val();

        getRecipes($recipeType, updateDOM);

    });
    function updateDOM(recipes) {

        //Convert recipes into JSON object
        recipeDataStore = JSON.parse(recipes);

        //Clear recipe container so we can load new recipes
        $recipesDisplay.empty();

        // Start Buildin DOM here
        var $headerResults = $('<h4>')
            .addClass('text-center border-bottom')
            .text('Recipes just for You');

        //create the Search Results Header
        $recipesDisplay.append($headerResults);

        // Loop thru all the results
        for (i = 0; i < recipeDataStore.count; i++) {
            if (i % 2) {// even card needs different value and margin bottom
                var $cardDiv = $('<div>').attr({
                    class: 'card mb-2',
                    id: 'card-width'
                });
            } else {// odd card needs to float and provide some marging right and bottom
                var $cardDiv = $('<div>').attr({
                    class: 'card mb-2 mr-sm-0 mr-md-0 mr-lg-2 float-lg-left float-md-none float-sm-none',
                    id: 'card-width'
                });
            }
            
                // grab the image from the returned object
            var $cardImg = $('<img>').attr({
                class: 'card-img-top',
                'src': recipeDataStore.recipes[i].image_url,
                'alt': 'Card image cp',
                'id': 'img-width'
            });

                // Create Div for Recipe Item
            var $cardBodyContainer = $('<div>').addClass('card-body');

                // Create a p for recipe Name
            var $pCard = $('<p>').addClass('card-text text-center')
                                 .text(recipeDataStore.recipes[i].title);

                // Build out the individual recipe container popup
            var $recipeDrop = $('<div>').addClass('drop-container');
            
            //Build ingredients expand Button
            $recipeDrop.append($('<span>').addClass('button')
                                          .attr({
                                          'id': 'drop-button',
                                          'data-recipe-id': recipeDataStore.recipes[i].recipe_id
                                          }).text('+'));
            
                //Create the <div> to store ingredients information
            var $ingredientsDiv = $('<div>').addClass('drop-content');
            
            //add class and title info
            $ingredientsDiv.append($('<div>').addClass('drop-head')
                                             .html('<h3>' + recipeDataStore.recipes[i].title + '</h3>'));

                //Create Body of popup message containing ingredients
            var $dropBody = $('<div>').addClass('drop-body');

            //Creates the scroll for the ingredients
            $dropBody.append($('<div>').attr({
                            class: 'list-group',
                            'data-spy': 'scroll',
                            'id': recipeDataStore.recipes[i].recipe_id,
                            'data-offset': '0'
            }));

                //Add text buttons to bottom of Recipes
            var $twilioButton = $('<button>').attr('id','twilio-button').text('Text Me');
            var $directionsButton = $('<a>').attr({
                                    'href':recipeDataStore.recipes[i].source_url,
                                    'target': '_blank',
                                    'id': 'url-button'})
                                    .text('Recipe Directions');

            //appends all elements into the DOM
            $dropBody.append($twilioButton, $directionsButton);
            $ingredientsDiv.append($dropBody);
            $recipeDrop.append($ingredientsDiv);
            $cardBodyContainer.append($pCard);
            $cardDiv.append($cardImg, $cardBodyContainer, $recipeDrop);
            $recipesDisplay.append($cardDiv);
        }

    }
    $('#recipe-query-results').unbind('click').on('click', '.button', function (event) {
        event.preventDefault();
        $(this).parent().toggleClass('expand');
        $(this).parent().children().toggleClass('expand');
            // Grab the recipeID from this button press
        var recipeId = $(this).attr('data-recipe-id');
            //This gets the current state to determin what the function needs to be
        var btnState = $(this).attr('class');
            //If statement to determine if we expand or collapse the div
        if (btnState === 'button expand') {
            //If the ingredients are not part of the recipIngredientStore Object then make the ajax call.
            if (Object.keys(recipeIngredientsStore).indexOf(recipeId) === -1) {
                //Ajax Call
                getRecipe(recipeId, ingredients);
            } else {// if ingredients have already been pulled in only update the textDataStore string with current info
                // Update the textData so the user can send a text themselves
                updateTextData();
            };
        }
    });
    function updateTextData(){
        
        // Update the textData so the user can send a text themselves
        textDataStore = "";
        textDataStore = recipeIngredientsObject.recipe.title;
        for (i = 0; i < recipeIngredientsObject.recipe.ingredients.length; i++) {
            textDataStore = textDataStore + '\n' + recipeIngredientsObject.recipe.ingredients[i];
        };
        
        //Added directions link to the text message.
        textDataStore = textDataStore + '\nDirections:\n' + recipeIngredientsObject.recipe.source_url;

    };
    function ingredients(recipeIngredients) {
        
        // recipeIngredients = the JSON you returned in call-recipe.js
        recipeIngredientsObject = JSON.parse(recipeIngredients);
        recipeIngredientsStore[recipeIngredientsObject.recipe.recipe_id] = recipeIngredientsObject;
        
        // Update the textDataStore so they can send a text
        updateTextData();

            // update DOM with ingredients for this expand
        var $ingredientsDiv = $('#' + recipeIngredientsObject.recipe.recipe_id);
        for (i = 0; i < recipeIngredientsObject.recipe.ingredients.length; i++) {
            var liIngredientItem = $('<li>').addClass('list-group-item').text(recipeIngredientsObject.recipe.ingredients[i]);
            $ingredientsDiv.append(liIngredientItem);
        }

  };

