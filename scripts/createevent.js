$(document).ready(()=>{
  $("#createEventBtn").on("click", sendData); //apply click handler to submit button on DOM
});
/**
 * Global Variable to store whether user is cyrrently logged in or not
 * @Global {Boolean}
 */
let loggedIn = false;
/**
 * Function to begin promise chain to pull lat and long of nearest cross-streets from event address, then send information to back-end.
 * @param none
 * @return {undefined}
 */
const sendData = () => {
  event.preventDefault();
    if(loggedIn){
      let address = $("#address").val()+", "+$("#city").val()+", "+$("#state").val(); //concatenate address inputs into proper format
      getLatLong(address).then(getCrossStreets).then(handleSuccess); //get geolocation of address, then get geolocation of cross-streets next to address, then send data to back-end
    } else {
      $(".modalText").text("Submitting an event requires a Facebook Login. Please log in and try again."); //add error text to modal
      $("#createEventModal").modal();
    }
}
/**
 * Ajax call to receive latitude and longitude of address to use for receiving cross streets in next ajax call
 * @param {string} address
 * @return {promise}
 */
const getLatLong = address => {
  let deferred = $.Deferred();
  $.ajax({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    method: "GET",
    data: {
      address: address,
      key: 'AIzaSyDxsAjsSwsaBzaz-xNaLnDUQEjr_BIsiCE'
    },
    success: deferred.resolve
  });
  return deferred;
}
/**
 * Function to use latitude and longitude of address to find latitude and longitude of nearest cross-street, to preserve privacy
 * @param {object} response
 * @return {promise}
 */
const getCrossStreets = response => {
  let deferred = $.Deferred();
  $.ajax({
    url: 'https://roads.googleapis.com/v1/nearestRoads',
    method: "GET",
    data: {
      points: `${response.results[0].geometry.location.lat}, ${response.results[0].geometry.location.lng}`,
      key: 'AIzaSyDxsAjsSwsaBzaz-xNaLnDUQEjr_BIsiCE'
    },
    success: deferred.resolve
  });
  return deferred;
}
/**
 * Function to group latitude and longitude of cross-streets received from prior Ajax calls and data from inputs on page, then send to back-end to create event.
 * @param {object} response
 * @return {undefined}
 */
const handleSuccess = response => {
  let result = { //group data from inputs on page, along with latitude and longitude from response
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
  $("#eventCreation")[0].reset(); //clear form
  $.ajax({
    method: 'post',
    dataType: 'json',
    url: "./back_end/event_input_decision_maker.php?action=newEvent",
    data: result,
    timeout: 5000,
    success: objectFromServer => {
        $(".modalText").text("Your event has been submitted! Any applications you receive will be sent to your email."); //put sucess response text in modal
        $("#createEventModal").modal();
    },
    error: (xhr, textStatus, errorString) => {
        $(".modalText").text("There was an error submitting your event, please try again."); //put error response text in modal
        $("#createEventModal").modal();
    }
  });
}
