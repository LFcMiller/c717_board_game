$(document).ready(()=>{
    $(".shadowBox").on("click", displayModal);
    $(".loginModal").on("click", displayModal);
});

var loggedIn = false;


function sendData(){
  event.preventDefault();
  displayModal();
  if(loggedIn){
    var address = $("#address").val()+", "+$("#city").val()+", "+$("#state").val()
    getLatLong(address).then(getCrossStreets).then(handleSuccess);
  } else {
    $("#submitResponse").text("Please Login before Submitting");
  }
}

function getLatLong(address) {
  var deferred = $.Deferred();
  $.ajax({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    method: "GET",
    data: {
      address: address,
      key: 'AIzaSyDxsAjsSwsaBzaz-xNaLnDUQEjr_BIsiCE'
    },
    success: deferred.resolve
  })
  return deferred;
}
function getCrossStreets(response) {
  console.log(response.results[0].geometry.location);
  var deferred = $.Deferred();
  $.ajax({
    url: 'https://roads.googleapis.com/v1/nearestRoads',
    method: "GET",
    data: {
      points: `${response.results[0].geometry.location.lat}, ${response.results[0].geometry.location.lng}`,
      key: 'AIzaSyDxsAjsSwsaBzaz-xNaLnDUQEjr_BIsiCE'
    },
    success: deferred.resolve
  })
  return deferred;
}
function handleSuccess(response) {
  console.log(response);
  var result = {
    game_name: $("#gameName").val(),
    num_players: $("#numPlayers").val(),
    street_address: $("#address").val(),
    city: $("#city").val(),
    state: $("#state").val(),
    zip: $("#zipcode").val(),
    general_details: $("#textDetails").val(),
    date: $("#year").val()+"-"+$("#month").val()+"-"+$("#day").val(),
    time: $("#time").val()+" "+$("#dayNight").val(),
    lat: response.snappedPoints[0].location.latitude,
    lng: response.snappedPoints[0].location.longitude,
    user_ID: user_ID
  };
  console.log(result);
  $("#eventCreation")[0].reset();
  $.ajax({
    method: 'post',
    dataType: 'json',
    url: "./3plus_table_solution/event_input_decision_maker.php?action=newEvent",
    data: result,
    timeout: 5000,
    success: function (objectFromServer) {
        console.log(objectFromServer);
        $("#submitResponse").text("Event has been submitted!");
    },
    error: function (xhr, textStatus, errorString) {
        $("#submitResponse").text("There was an error submitting your event, please try again.");
    }
  });
}

function displayModal () {
    $(".shadowBox").toggleClass("hidden");
    $(".loginModal").toggleClass("hidden");
}