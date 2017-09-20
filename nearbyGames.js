$(document).ready(()=>{
    populatePage(gameData);
    $(".showAll").on("click", function(){
      setMapOnAll(map);
    });
});

var testZip = '92618';
var map;
var markers = [];

var gameData = {
  "success": true,
  "errors": [],
  "data":
      [
        {
          game_name : 'Monopoly',
          general_details : 'experienced players preferred, college students preferred, parking available, food provided',
          street_address : '5500 Irvine Center Dr.',
          city : 'Irvine',
          state : 'CA',
          zip : '92618',
          lat : '33.675824',
          lon : '-117.778006',
          date : 'October 28th, 2017',
          time : '5:00 pm'
        },
        {
          game_name : 'Scrabble',
          general_details : 'BYOB, no food provided, 21 years old and up, parking unavailable',
          street_address : '50 Eastshore',
          city : 'Irvine',
          state : 'CA',
          zip : '92604',
          lat : '33.675216',
          lon : '-117.784979',
          date : 'November 13th, 2017',
          time : '6:30 pm'
        },
        {
          game_name : 'Cards Against Humanity',
          general_details : 'BBQ before party, BYOB, parking available, pets present, adults only, no previous experience necessary',
          street_address : '2005 Los Trancos Dr.',
          city : 'Irvine',
          state : 'CA',
          zip : '92617',
          lat : '33.641954',
          lon : '-117.840736',
          date : 'December 1st, 2017',
          time : '5:00 pm' 
        },
        {
          game_name : 'Scrabble, Apples to Apples, Pictionary',
          general_details : 'Private event, Staff and RSVP only, food provided, no alcohol, guest and staff parking, all age groups, any level of experience',
          street_address : 'Irvine Research Center',
          city : 'Irvine',
          state : 'CA',
          zip : '92618',
          lat : '33.642333',
          lon : '-117.739639',
          date : 'November 15th, 2017',
          time : '6:30 pm'
        },
        {
          game_name : 'Charades',
          general_details : 'Staff and family members only, food provided, wine provided, guest parking',
          street_address : 'Irvine Medical and Science Complex',
          city : 'Irvine',
          state : 'CA',
          zip : '92618',
          lat : '33.658195',
          lon : '-117.767148',
          date : 'December 12th, 2017',
          time : '7:00 pm'
        },
        {
          game_name : 'Yahtzee',
          general_details : 'No food or drinks, water ok, all age groups, previous experience preferred',
          street_address : '101 Technology Dr.',
          city : 'Irvine',
          state : 'CA',
          zip : '92618',
          lat : '33.6505632',
          lon : '-117.7461516',
          date : 'October 10th, 2017',
          time : '12:00 pm'
        },
        {
          game_name : 'Clue',
          general_details : 'No alcohol, all age groups, parking available, pets in the house, no previous experience required',
          street_address : '1 Holland',
          city : 'Irvine',
          state : 'CA',
          zip : '92618',
          lat : '33.646562',
          lon : '-117.7265231',
          date : 'September 22nd, 2017',
          time : '3:00 pm'
        },
        {
          game_name : 'Ouija',
          general_details : 'Will have alcohol, BYOB, no food, pets in the house, no parking available',
          street_address : 'Snow Heaven, 22367 El Toro Rd.',
          city : 'Lake Forest',
          state : 'CA',
          zip : '92630',
          lat : '33.638777',
          lon : '-117.680747',
          date : 'November 15th, 2017',
          time : '8:30 pm'
        },
        {
          game_name : 'Monopoly',
          general_details : 'BBQ before the game, all age groups, BYOB, parking available, carpool available, no previous experience required',
          street_address : 'Pizza 900, 23020 Lake Forest Dr. #170',
          city : 'Laguna Hills',
          state : 'CA',
          zip : '92653',
          lat : '33.628360',
          lon : '-117.725223',
          date : 'October 7th, 2017',
          time : '5:00 pm'
        },
        {
          game_name : 'The Game of Life',
          general_details : 'some alcohol provided, BYOB, no food provided, no parking, carpool available, 21 years and older only',
          street_address : '9461 Irvine Center Dr.',
          city : 'Irvine',
          state : 'CA',
          zip : '92618',
          lat : '33.635140',
          lon : '-117.735505',
          date : 'September 29th, 2017',
          time : '7:00 pm'
        },
        {
          game_name : 'Sorry!',
          general_details : 'Kids game, BBQ for parents, parking available, no experience required',
          street_address : '511 Spectrum Center Dr.',
          city : 'Irvine',
          state : 'CA',
          zip : '92618',
          lat : '33.651447',
          lon : '-117.745689',
          date : 'July 2nd, 2017',
          time : '10:00 am'
        },
        {
          game_name : 'Battleship',
          general_details : 'two dogs in the house, all age groups, food provided, no parking',
          street_address : '115 Technology Dr.',
          city : 'Irvine',
          state : 'CA',
          zip : '92618',
          lat : '33.660166',
          lon : '-117.744691',
          date : 'October 4th, 2017',
          time : '4:00 pm'
        },
        {
          game_name : 'Catan',
          general_details : 'no alcohol, bring your own food, parking available, no previous game exprience necessary, all age groups',
          street_address : '125 Retreat',
          city : 'Irvine',
          state : 'CA',
          zip : '92603',
          lat : '33.643051',
          lon : '-117.770051',
          date : 'September 27th, 2017',
          time : '6:00 pm'
        }
      ]
}

function populatePage (response) {
  if (response.data.length > 0) {
    $(".gamesContainer").html("");
    for (var i=0; i < response.data.length; i++) {
      var gameDiv = $("<div>").addClass("gameName truncate col-xs-3").text(response.data[i].game_name);
      var dateDiv = $("<div>").addClass("date col-xs-3").text(response.data[i].date);
      var timeDiv = $("<div>").addClass("time col-xs-3").text(response.data[i].time);
      var revealButton = $("<button>").addClass("btn btn-primary col-xs-3").text("Click To Expand").attr("index", i).on("click", (event)=>{
          $("div[reveal='"+$(event.target).attr("index")+"']").toggleClass("hidden");
      });    
      var row1 = $("<div>").addClass("row1").attr("index", i).append(gameDiv, dateDiv, timeDiv, revealButton).on("click", handleMapFocus);
      var detailsDiv = $("<div>").addClass("details col-xs-8").text(response.data[i].general_details);
      var applyButton = $("<button>").addClass("btn btn-success").text("Apply");
      var row2 = $("<div>").addClass("row2 hidden").append(detailsDiv, applyButton).attr("reveal", i);
      var gameContainerDiv = $("<div>").addClass("game col-xs-12");
      gameContainerDiv.append(row1, row2);
      $(".gamesContainer").append(gameContainerDiv);
    }
  }
}

function handleMapFocus(event){
  map.setCenter({
    lat: parseFloat(gameData.data[$(event.currentTarget).attr("index")].lat),
    lng: parseFloat(gameData.data[$(event.currentTarget).attr("index")].lon)
  })
  setMapOnAll(null);
  markers[$(event.currentTarget).attr("index")].setMap(map);
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function initMap() {
  $.ajax({
    url: 'http://maps.googleapis.com/maps/api/geocode/json',
    method: 'GET',
    data: {
      address: testZip
    },
    success: function(response){
      var location = response.results[0].geometry.location;
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(location.lat,location.lng),
        mapTypeId: 'roadmap'
      });
    
      populateMap(gameData);
    }
  })
}

// Loop through the results array and place a marker for each
// set of coordinates.
function populateMap (response) {
  for (var i = 0; i < response.data.length; i++) {
    var latLng = new google.maps.LatLng(parseFloat(response.data[i].lat),parseFloat(response.data[i].lon));
    var marker = new google.maps.Circle({
      strokeColor: '#9b10c9',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#9b10c9',
      fillOpacity: 0.35,
      map: map,
      center: latLng,
      radius: 800
    });
    markers.push(marker);
  }
}
