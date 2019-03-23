




var topics=[ 'burgers', 'steak', 'chicken'];
console.log(topics);

var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=IfxcrjWn87GVKPi8cQwKzSfsdFHsqnqB&q=';
var userInput =  $('#user-input').val().trim(); 


function getGiphy(){
  var giphy = $(this).attr('food');
  console.log(giphy);
  
$.ajax({
    url: queryURL + userInput,
    method: "GET"
  })
    .then(function(response) {
      console.log(response);
    
      var results = response.data  ;

    




var rating = results[i].rating;

for (var i = 0; i < results.length; i++) {
    var newDiv = $("<div>");

    var p = $("<p>").text("Rating: " + rating);

    var newImg = $('<img>');

    newImg.attr("src", 'food', results[i].images.fixed_height.url);

    var p = $('<p>').text("Rating: " + rating);
    
    newDiv.prepend(p);
    newDiv.prepend(newImg);

    $('#results-div').prepend(newDiv);
    };


    });
  }



function createBtn(){

$('#topics-button').empty();

  for(var i = 0; i < topics.length; i++){

    var button = $('<button>');

    button.addClass('food-topic');

    button.attr('food', topics[i]);

    button.text(topics[i]);

    $('#topics-button').append(button);


}

}

// make an onclick function for user input
$('#submit-button').on('click', function(event){
event.preventDefault();
getGiphy();

giphy = userInput;

console.log(userInput);


createBtn();




});

$(document).on('click', 'food', getGiphy);










