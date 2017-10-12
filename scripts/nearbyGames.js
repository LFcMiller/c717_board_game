/**
 * Global Variable for Google Maps to reserve variable for map created asynchronously
 * @Global {Object}
 */
var map;
/**
 * Global Variable to store array of all map markers containing board game events
 * @Global {Array} of {Objects}
 */
var markers = [];
/**
 * Global Variable to store all data for each event in zipcode searched
 * @Global {Array} of {Objects}
 */
var eventList = [];
/**
 * Global Variable for Google Maps to reserve variable for infowindow displayed above markers on click
 * @Global {Object}
 */
var infowindow;
/**
 * Global Variable to store if user is currently logged in to Facebook
 * @Global {Boolean}
 */
var loggedIn = false;
/**
 * Ajax call to pull list of events in a given zipcode from database, then create map markers and list items for each
 * @param none
 * @return {undefined} 
 */
function pullData(){
  $.ajax({
    url: "./back_end/event_input_decision_maker.php?action=readByZip",
    method: "POST",
    dataType: "json",
    data: {
      zip: currentZip
    },
    success: function(response) {
      if(response.data){
        populatePage(response);
        populateMap(response);
      } else {
        $(".containerTitle").text("Sorry, there are currently no games in your area.");
      }
    }
  });
}
/**
 * Function to send email to event host upon user applying to event, if user is already logged into Facebook
 * @param {object} event
 * @return {undefined} 
 */
function applyToEvent(event){
  if(loggedIn){
    $.ajax({
      url: "./back_end/event_input_decision_maker.php?action=applyToEvent",
      method: "POST",
      dataType: "json",
      data: {
        user_ID: user_ID, //current user's ID
        event_ID: eventList[$(event.target).attr("index")].event_ID //ID of event

      },
      success: function(response){
        if(response.success){ //if email was sent successfully
          $(".modalText").text("Your application has been submitted!"); //set modal success text
        } else {
          $(".modalText").text(response.errors[0]); //set received error as modal text
        }
        $("#applyModal").modal(); //trigger modal
      },
      error: function(response){
        $(".modalText").text("There was an error submitting your application, please try again."); //if email was not sent successfully, set modal error text
        $("#applyModal").modal(); //trigger modal
      }
    })
  } else {
    $(".modalText").text("Applying to events requires a Facebook Login. Please log in and try again."); //set modal text to alert user that they must log in
    $("#applyModal").modal(); //trigger modal
  }
}
/**
 * Function to put list of game events received from database on DOM dynamically
 * @param {Object} response
 * @return {undefined} 
 */
function populatePage(response) {
  $(".gamesContainer").empty(); //clear any existing information from Game Container div on DOM
  eventList = response.data; //save event list received from ajax call on page to use in apply function
  for (var i = 0; i < response.data.length; i++) {
    var gameDiv = $("<div>") //create div on page with name of Game Event displayed within
      .addClass("gameName truncate col-xs-12")
      .attr("index", i)
      .text(response.data[i].game_name)
      .on("click", (event)=>{ //set click handlers
        handleMapFocus(event); //show event focused on map
        displayAdditionalInfo($(event.target).attr("index")); //show additional event info in additional info window
      });
    var gameContainerDiv = $("<div>").addClass("game col-xs-12");
    gameContainerDiv.append(gameDiv);
    $(".gamesContainer").append(gameContainerDiv); //add element to DOM
  }
}
/**
 * Function to display additional event info upon click of event in event list or on map
 * @param {number} index
 * @return {Object} 
 */
//TODO: confirm that the tags aren't created as tags (cross-site scripting)
function displayAdditionalInfo(index){
  $(".eventInfo").empty(); //remove any existing data in additional info container
  var dateDiv = $("<div>") //show event date
    .addClass("date col-xs-12")
    .text("Date: " + reformatDate(eventList[index].date)); //show date in human readable format
  var timeDiv = $("<div>") //show event time
    .addClass("time col-xs-12")
    .text("Time: " + eventList[index].time);
  var detailsDiv = $("<div>") //show event details
    .addClass("details col-xs-12")
    .text("Details: " + eventList[index].general_details);
  var applyButton = $("<button>") //add button to apply to event
    .addClass("btn btn-success apply col-xs-6 col-xs-offset-3")
    .attr("index", index)
    .text("Apply")
    .on("click", applyToEvent);
  $(".eventInfo").append(dateDiv, timeDiv, detailsDiv, applyButton); //add to DOM
}
/**
 * Function to convert date from format received from back-end into human readable format
 * @param {string} unformattedDate
 * @return {string} 
 */
function reformatDate(unformattedDate){
    var splitDate = unformattedDate.split('-'); //split received date on hyphens
    var dateObject = { //lookup object for month abbreviations
      '01':'Jan',
      '02':'Feb',
      '03':'Mar',
      '04':'Apr',
      '05':'May',
      '06':'Jun',
      '07':'July',
      '08':'Aug',
      '09':'Sept',
      '10':'Oct',
      '11':'Nov',
      '12':'Dec'
    }
    return dateObject[splitDate[1]] + ' ' + parseInt(splitDate[2]); //return Abbreviated month and day
}
/**
 * Function to focus on and highlight marker on map that correlates to event in focus 
 * @param {object} event
 * @return {undefined} 
 */
function handleMapFocus(event) {
  var marker = markers[$(event.currentTarget).attr("index")]; //select marker that relates to event that was clicked
  map.setCenter({ //set center of map above marker
    lat: parseFloat(marker.place.lat),
    lng: parseFloat(marker.place.lng)
  });
  infowindow.setContent(marker.content); //set infowindow text to content set to marker
  infowindow.setPosition(marker.place); //set position of infowindow above marker
  infowindow.open(map); //open infowindows
  resetColors(); //reset all marker colors
  marker.setOptions({ //set focused marker color to green, rather than default purple
    strokeColor: "#35dd46",
    fillColor: "#35dd46"
  });
}
/**
 * Function to reset marker colors on map
 * @param none
 * @return {undefined} 
 */
function resetColors() {
  for (var i = 0; i < markers.length; i++) { //loop through markers
    markers[i].setOptions({ //set all markers to default purple
      strokeColor: "#9b10c9",
      fillColor: "#9b10c9"
    });
  }
}
/**
 * Ajax Call to create Google Map centered on searched zipcode
 * @param none
 * @return {undefined} 
 */
function initMap() {
  $.ajax({
    url: "https://maps.googleapis.com/maps/api/geocode/json",
    method: "GET",
    data: {
      address: currentZip
    },
    success: function(response) {
      var location = response.results[0].geometry.location; //set location of map to geolocation of zipcode passed into ajax call
      infowindow = new google.maps.InfoWindow(); //create infowindow
      map = new google.maps.Map(document.getElementById("map"), { //create map centered on location
        zoom: 12,
        center: new google.maps.LatLng(location.lat, location.lng),
        mapTypeId: "roadmap"
      });
      pullData(); //pull event data from database
    }
  });
}
/**
 * Function to create markers on map for each event received from database
 * @param {object} response
 * @return {undefined} 
 */
function populateMap(response) {
  for (var i = 0; i < response.data.length; i++) { //loop through array of event objects
    var latLng = new google.maps.LatLng(parseFloat(response.data[i].lat),parseFloat(response.data[i].lng)); //set lat and long of marker
    var marker = new google.maps.Circle({ //create circle marker
      strokeColor: "#9b10c9",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#9b10c9",
      fillOpacity: 0.35,
      map: map,
      center: latLng,
      radius: 800 //circle radius in meters
    });
    marker.content = `<h4 style="color:black;">${response.data[i].game_name}</h4>` + //set content to put in infowindow on click
                     `<p style="color:black;"><strong>Date: </strong>${response.data[i].date}</p>` +
                     `<p style="color:black;"><strong>Time: </strong>${response.data[i].time}</p>`;
    marker.place = { //save marker location for future map focus and centering
      lat: parseFloat(response.data[i].lat),
      lng: parseFloat(response.data[i].lng)
    };
    (function(marker, pos, index) { //create click handler within closure in order to pass in current index in array, current marker highlighted, and current value of position to center infowindow on
      marker.addListener("click", function() {
        infowindow.setContent(marker.content); //set infowindow contents
        infowindow.setPosition(pos); //set infowindow location
        infowindow.open(map); //show infowindow
        resetColors(); //reset colors
        marker.setOptions({ //set focused marker color to green rather than default purple
          strokeColor: "#35dd46",
          fillColor: "#35dd46"
        });
        displayAdditionalInfo(index); //display additional event info for event correlated to marker
      });
    })(marker, latLng, i);
    markers.push(marker); //add marker to marker array
  }
}

