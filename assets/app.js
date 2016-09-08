//Initial array of topics is provided
var topics = ['dog','cat','rabbit','hamster','skunk','goldfish','bird','ferret'];

// Display Topic Info and renders HTML appropriate to the content topic clicked
function displayTopicInfo() {
	//place focus on current topic button clicked
	//$(.topicButton).removeClass('active');
	var topic = $(this).attr('data-name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {

     	$('#topicView').empty();
     	var results = response.data;

     	for (var i=0; i<results.length;i++) {

     	//Creates a generic div to hold the topic
     	var topicDiv = $('<div>');

     	//Creates an element to have the rating displayed
     	var p = $('<p>').text("Rating: " + results[i].rating);

     	//Creates and appends an image; assigns attributes to pause and animate
     	var image = $('<img>');
     	var thumbnail = $('<div>').addClass("thumbnail");
     	
     	image.attr("data-still",results[i].images.fixed_height_still.url);
     	image.attr("data-animate",results[i].images.fixed_height.url);
     	image.attr("data-state","still");
     	image.attr("data-id",results[i].id);
     	image.attr('src',results[i].images.fixed_height_still.url);


     	//Appends the newly created html elements
     	thumbnail.append(p);
     	thumbnail.append(image);
     	topicDiv.append(thumbnail);
     	
     	//Prints the html content
     	$('#topicView').append(topicDiv);

	};
 });
}
	
//Function starts and pauses animation of chosen html img
function animatePic() {
	var state = $(this).attr('data-state');
		if (state === "still") {
			$(this).attr("src",$(this).data("animate"));
			$(this).attr("data-state","animate");
		} else {
			$(this).attr("src",$(this).data("still"));
			$(this).attr("data-state","still");
		}

}




//Generic function for building buttons including when a new button is added
function renderButtons() {

	//Deletes buttons prior to adding new one to avoid creating duplicates
	$('#buttonsView').empty();

	//Loops through the array of topics
	for (var i=0; i<topics.length; i++) {

		//Dynamically generate buttons for each topic in the array
		var a = $('<button>')
		a.addClass('topic');
		a.attr('data-name',topics[i]);			//adds a data attribute
		a.text(topics[i]);						//provides text for button 
		$('#buttonsView').append(a);			//Adds button to the HTML
	}
}

//Function to add a button based on user input in form

$('#addTopic').on('click', function() {

	//We grab input from the textbox in form
	var topic = $('#topicInput').val().trim();

	//The topic is added to the topics array
	topics.push(topic);

	//Our array calls function to render new buttons with topic added
	renderButtons();

	//This line allows users to hit 'enter' instead of clicking on the sumbit button and
	//prevents html from going to the next page
	return false;


})

//Function to display the topic info
$(document).on('click','.topic',displayTopicInfo);
$(document).on('click','img',animatePic);

//Instructions to run the renderButtons function
renderButtons();


