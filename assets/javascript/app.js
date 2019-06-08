

$(document).ready(function() {
  var topics = ["burgers", "steak", "chicken", "pizza", "tofu", "salad", "ice-cream", "shrimp", "rice", "yams"];

  function renderBtns() {
    $("#topics-buttons").empty();
    for (var i = 0; i < topics.length; i++) {
      var newBtn = $(`<button/>`);
      newBtn.addClass("food-buttons");
      newBtn.attr("data-food", topics[i]);
      newBtn.text(topics[i]);
      $("#topics-buttons").append(newBtn);

    }

    $(".food-buttons").on("click", function getGiphy() {
      var giphy = $(this).attr("data-food");
    
      

      var queryURL =
        "https://api.giphy.com/v1/gifs/search?q="+ giphy +"&api_key=IfxcrjWn87GVKPi8cQwKzSfsdFHsqnqB&limit=10"  ;

      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        var results = response.data;
        
       console.log(results);
        
        for (var i = 0; i < topics.length; i++) {
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            
            var gifDiv = $("<div class='col-md-3'>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var foodImage = $("<img>");
            foodImage.addClass("gif");
            foodImage.attr("src", results[i].images.fixed_height_small_still.url);
            foodImage.attr("data-still", results[i].images.fixed_height_small_still.url );
            foodImage.attr("data-animate", results[i].images.fixed_height_small.url);
            foodImage.attr("data-state", "still");
            

            // add a class to the images
            
            // add attributtes to an image
         
            console.log(foodImage);
            gifDiv.append(p);
            gifDiv.append(foodImage);
            $("#results-row").prepend(gifDiv);
            
          } 
        }
      });
    });
  }

  // use .text() to get the vale of a buttton

  $("#submit-button").on("click", function() {
    event.preventDefault();
    // topics.push($('#user-input').val().trim());

    var newFood = $("#user-input")
      .val()
      .trim();
    topics.push(newFood);
    renderBtns();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newFood + "&api_key=IfxcrjWn87GVKPi8cQwKzSfsdFHsqnqB&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      var results = response.data;
      $("#results-row").empty();
      for (var i = 0; i < topics.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div class='col-md-3'>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var foodImage = $("<img>");
            foodImage.addClass("gif");
            foodImage.attr("src", results[i].images.fixed_height_small_still.url);
            foodImage.attr("data-still", results[i].images.fixed_height_small_still.url );
            foodImage.attr("data-animate", results[i].images.fixed_height_small.url);
            foodImage.attr("data-state", "still");
            gifDiv.append(p);
            gifDiv.append(foodImage);
            $("#results-row").prepend(gifDiv);
          }
        }
      }
    )

});



  renderBtns();

  //  create a on click function using the class
  $(document).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");

    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
  };
  });
})

