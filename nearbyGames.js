$(document).ready(()=>{
  $(".shadowBox").on("click", displayModal);
  $(".loginModal").on("click", displayModal);
})

var testZip = "92618";
var map;
var markers = [];
var eventList = [];
var infowindow;
var loggedIn = false;


function pullData(){
  $.ajax({
    url: "./back_end/event_input_decision_maker.php?action=readByZip",
    method: "POST",
    dataType: "json",
    data: {
      zip: currentZip || testZip
    },
    success: function(response) {
      console.log("Response: ", response);
      populatePage(response);
      populateMap(response);
    }
  });
}


function applyToEvent(event){
  if(loggedIn){
    console.log(eventList[$(event.target).attr("index")]);
    $(".modalText").text("Your application has been submitted!");
    displayModal();
    $.ajax({
      url: "./back_end/event_input_decision_maker.php?action=applyToEvent",
      method: "POST",
      dataType: "json",
      data: {
        user_ID: user_ID,
        event_ID: eventList[$(event.target).attr("index")].event_ID

      },
      success: function(response){
        console.log('email has been sent!',response);
      },
      error: function(response){
        console.log('error with email ajax call',response);
      }
    })
  } else {
    $(".modalText").text("Not Logged In");
    displayModal();
  }
}


function populatePage(response) {
  if (response.data.length > 0) {
    $(".gamesContainer").html("");
    eventList = response.data;
    // for (var i = 0; i < response.data.length; i++) {
    //   var gameDiv = $("<div>")
    //     .addClass("gameName truncate col-xs-3")
    //     .text(response.data[i].game_name);
    //   var dateDiv = $("<div>")
    //     .addClass("date col-xs-3")
    //     .text(response.data[i].date);
    //   var timeDiv = $("<div>")
    //     .addClass("time col-xs-3")
    //     .text(response.data[i].time);
    //   var revealButton = $("<button>")
    //     .addClass("btn btn-primary col-xs-3")
    //     .text("Click To Expand")
    //     .attr("index", i)
    //     .on("click", event => {
    //       $("div[reveal='" + $(event.target).attr("index") + "']").toggleClass(
    //         "hidden"
    //       );
    //     });
    //   var row1 = $("<div>")
    //     .addClass("row1")
    //     .attr("index", i)
    //     .append(gameDiv, dateDiv, timeDiv, revealButton)
    //     .on("click", handleMapFocus);
    //   var detailsDiv = $("<div>")
    //     .addClass("details col-xs-8")
    //     .text(response.data[i].general_details);
    //   var applyButton = $("<button>")
    //     .addClass("btn btn-success apply")
    //     .attr("index", i)
    //     .text("Apply")
    //     .on("click", applyToEvent);;
    //   var row2 = $("<div>")
    //     .addClass("row2 hidden")
    //     .append(detailsDiv, applyButton)
    //     .attr("reveal", i);
    //   var gameContainerDiv = $("<div>").addClass("game col-xs-12");
    //   gameContainerDiv.append(row1, row2);
    //   $(".gamesContainer").append(gameContainerDiv);
    // }
    for (var i = 0; i < response.data.length; i++) {
      var gameDiv = $("<div>")
        .addClass("gameName truncate col-xs-12")
        .attr("index", i)
        .text(response.data[i].game_name)
        .on("click", (event)=>{
          handleMapFocus(event)
          displayAdditionalInfo($(event.target).attr("index"));
        })
      var dateDiv = $("<div>")
        .addClass("date col-xs-3")
        .text(response.data[i].date);
      var timeDiv = $("<div>")
        .addClass("time col-xs-3")
        .text(response.data[i].time);
      var detailsDiv = $("<div>")
        .addClass("details col-xs-8")
        .text(response.data[i].general_details);
      var applyButton = $("<button>")
        .addClass("btn btn-success apply")
        .attr("index", i)
        .text("Apply")
        .on("click", applyToEvent);
      var gameContainerDiv = $("<div>").addClass("game col-xs-12");
      gameContainerDiv.append(gameDiv);
      $(".gamesContainer").append(gameContainerDiv);
    }
  }
}

function displayAdditionalInfo(index){
  $(".eventInfo").empty();
  var dateDiv = $("<div>")
    .addClass("date col-xs-12")
    .text("Date: "+eventList[index].date);
  var timeDiv = $("<div>")
    .addClass("time col-xs-12")
    .text("Time: "+eventList[index].time);
  var detailsDiv = $("<div>")
    .addClass("details col-xs-12")
    .text("Details: "+eventList[index].general_details);
  var applyButton = $("<button>")
    .addClass("btn btn-success apply col-xs-3")
    .attr("index", index)
    .text("Apply")
    .on("click", applyToEvent);
  $(".eventInfo").append(dateDiv, timeDiv, detailsDiv, applyButton);
}

function handleMapFocus(event) {
  console.log(event);
  var marker = markers[$(event.currentTarget).attr("index")];
  map.setCenter({
    lat: parseFloat(marker.place.lat),
    lng: parseFloat(marker.place.lng)
  });
  infowindow.setContent(marker.content);
  infowindow.setPosition(marker.place);
  infowindow.open(map);
  resetColors();
  marker.setOptions({
    strokeColor: "#35dd46",
    fillColor: "#35dd46"
  });
}

function resetColors() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setOptions({
      strokeColor: "#9b10c9",
      fillColor: "#9b10c9"
    });
  }
}

function initMap() {
  $.ajax({
    url: "https://maps.googleapis.com/maps/api/geocode/json",
    method: "GET",
    data: {
      address: testZip
    },
    success: function(response) {
      var location = response.results[0].geometry.location;
      infowindow = new google.maps.InfoWindow();
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: new google.maps.LatLng(location.lat, location.lng),
        mapTypeId: "roadmap"
      });
      pullData();
    }
  });
}

// Loop through the results array and place a marker for each
// set of coordinates.
function populateMap(response) {
  for (var i = 0; i < response.data.length; i++) {
    var latLng = new google.maps.LatLng(parseFloat(response.data[i].lat),parseFloat(response.data[i].lng));
    var marker = new google.maps.Circle({
      strokeColor: "#9b10c9",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#9b10c9",
      fillOpacity: 0.35,
      map: map,
      center: latLng,
      radius: 800
    });
    marker.content = `<h4 style="color:black;">${response.data[i].game_name}</h4>` +
                     `<p style="color:black;"><strong>Date: </strong>${response.data[i].date}</p>` +
                     `<p style="color:black;"><strong>Time: </strong>${response.data[i].time}</p>`;
    marker.place = {
      lat: parseFloat(response.data[i].lat),
      lng: parseFloat(response.data[i].lng)
    };
    (function(marker, pos) {
      marker.addListener("click", function() {
        infowindow.setContent(marker.content);
        infowindow.setPosition(pos);
        infowindow.open(map);
        resetColors();
        marker.setOptions({
          strokeColor: "#35dd46",
          fillColor: "#35dd46"
        });
      });
    })(marker, latLng);
    markers.push(marker);
  }
}

function displayModal () {
  $(".shadowBox").toggleClass("hidden");
  $(".loginModal").toggleClass("hidden");
}
