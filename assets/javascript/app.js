var topics = [];
var apiKey = "5LZUjMoZCGrjL8t9M5MTsQdPBbeObP2C";

//function for displaying food image
function displayFoodImage() {
  $("#food-images").empty();
  var food = $(this).attr("data-name");
  var URL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    food +
    "&limit=10" +
    "&api_key=" +
    apiKey;

  // Creates AJAX call for the specific food button being clicked
  $.ajax({
    url: URL,
    method: "GET"
  }).then(function(response) {
    for (var i = 0; i < 10; i++) {
      //make the food div
      var foodDiv = $("<div class='food-img'>");
      //get the image URL
      var foodImageURL = response.data[i].images.fixed_height_still.url;
      var foodImg = $("<img>").attr("src", foodImageURL);
      foodImg.attr("id", "food-img-" + i);
      foodImg.attr("value", food);
      //get the rating
      var foodRating = response.data[i].rating;
      var foodRatingP = $("<p>").text("Rating: " + foodRating);
      //appends the url and rating
      foodDiv.append(foodImg);
      foodDiv.append(foodRatingP);

      $("#food-images").append(foodDiv);
    }
  });
}

//function for starting or stopping the gif when user clicks on the image
function startStopGif() {
  var currentURL = this.getAttribute("src");
  var currentFood = this.getAttribute("value");
  var imageNum = this.getAttribute("id").charAt(9);

  var URL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    currentFood +
    "&limit=10" +
    "&api_key=" +
    apiKey;

  $.ajax({
    url: URL,
    method: "GET"
  }).then(function(response) {
    if (currentURL === response.data[imageNum].images.fixed_height_still.url) {
      $("#food-img-" + imageNum).attr(
        "src",
        response.data[imageNum].images.fixed_height_downsampled.url
      );
    } else if (
      currentURL === response.data[imageNum].images.fixed_height_downsampled.url
    ) {
      $("#food-img-" + imageNum).attr(
        "src",
        response.data[imageNum].images.fixed_height_still.url
      );
    }
  });
}

//function for displaying food button
function foodButtons() {
  // Deletes the food prior to adding new food
  // (this is necessary otherwise you will have repeat buttons)
  $("#food-buttons").empty();
  // Loops through the array of food
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generates buttons for each food in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of food-btn to our button
    a.addClass("food-btn");
    // Added a data-attribute
    a.attr("data-name", topics[i]);
    // Provided the initial button text
    a.text(topics[i]);
    // Added the button to the food-buttons div
    $("#food-buttons").append(a);
  }
}

//function for adding food button
$("#add-food").on("click", function() {
  //event.preventDefault();
  // This line of code will grab the input from the textbox
  var food = $("#food-input").val();

  // The food from the textbox is then added to our array
  topics.push(food);

  // Calling renderButtons which handles the processing of our topics array
  foodButtons();
});

// Adding click event listeners to all elements with a class of "food-btn"
$(document).on("click", ".food-btn", displayFoodImage);

//Starts or stops the gif when user clicks on image
$(document).on("click", "img", startStopGif);
