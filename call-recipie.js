function getRecipie(recipieID) {

var queryURL = "https://www.food2fork.com/api/get?key=d22669e556f9e536d2d4e73b6cb07813&rId=" + recipieID;
var recipie = '';
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log('Recipie',response);
  recipie = response;
  
});
return recipie;
};