

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

      //   var a = $(“<button>“);
      //  a.addClass(classToAdd);
      //  a.attr(“data-type”, arrayToUse[i]);
      //  a.text(arrayToUse[i]);
      //  $(areaToAddTo).append(a);
    }

    $(".food-buttons").on("click", function getGiphy() {
      var giphy = $(this).attr("data-food");
      if (giphy === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-food", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-food", "still");
      }
      

      var queryURL =
        "https://api.giphy.com/v1/gifs/search?q="+ giphy +"&api_key=IfxcrjWn87GVKPi8cQwKzSfsdFHsqnqB&limit=10"  ;

      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        var results = response.data;
        // results = $(this).attr("data-food");
        // if (results === "still"){
        //   $(this).attr("src", $(this).attr("data-animate"));
        //   $(this).attr("data-food", "animate");
        // }
        // else{
        //   $(this).attr("src", $(this).attr("data-still"))
        //   $(this).attr("data-food", "still");
        // }
        // $("#results-row").empty();
       console.log(results);
        
        for (var i = 0; i < topics.length; i++) {
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            
            var gifDiv = $("<div class='col-md-3'>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var foodImage = $("<img>");
            foodImage.attr("src", results[i].images.fixed_height_small.url);
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
            foodImage.attr("src", results[i].images.fixed_height_small.url);
            gifDiv.append(p);
            gifDiv.append(foodImage);
            $("#results-row").prepend(gifDiv);
          }
        }
      }
    )

    // use .val() to get the value of the input field
});



  renderBtns();

  //  create a on click function using the class
});

