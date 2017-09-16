$(document).ready(()=>{
    populatePage(gameData);
});

var gameData = {
  "success": true,
  "errors": [],
  "data":
      [
            {
                "event_ID": "1",
                "game_name": "Settlers of Catan",
                "general_details": "blah blah blah it's Catan yes we roll dice no we don't play nice. Go to the second floor when you get there.",
                "street_address": "9200 Irvine Center Dr.",
                "city": "Irvine",
                "state": "CA",
                "zip": "92618",
                "lat":"33.634858",
                "lon":"-117.740464",
                "date":"2017-09-13",
                "time":"7:30"
            },
            {
                "event_ID": "1",
                "game_name": "Settlers of Catan",
                "general_details": "blah blah blah it's Catan yes we roll dice no we don't play nice. Go to the second floor when you get there.",
                "street_address": "9200 Irvine Center Dr.",
                "city": "Irvine",
                "state": "CA",
                "zip": "92618",
                "lat":"33.634858",
                "lon":"-117.740464",
                "date":"2017-09-13",
                "time":"7:30"
            },
            {
                "event_ID": "1",
                "game_name": "Settlers of Catan",
                "general_details": "blah blah blah it's Catan yes we roll dice no we don't play nice. Go to the second floor when you get there.",
                "street_address": "9200 Irvine Center Dr.",
                "city": "Irvine",
                "state": "CA",
                "zip": "92618",
                "lat":"33.634858",
                "lon":"-117.740464",
                "date":"2017-09-13",
                "time":"7:30"
            }
      ]
}

function populatePage (response) {
  for (var i=0; i < response.data.length; i++) {
    var gameDiv = $("<div>").addClass("gameName truncate col-xs-3").text(response.data[i].game_name);
    var dateDiv = $("<div>").addClass("date col-xs-3").text(response.data[i].date);
    var timeDiv = $("<div>").addClass("time col-xs-3").text(response.data[i].time);
    var revealButton = $("<button>").addClass("btn btn-primary col-xs-3").text("Click To Expand").attr("index", i).on("click", (event)=>{
        $("div[reveal='"+$(event.target).attr("index")+"']").toggleClass("hidden");
    });    
    var row1 = $("<div>").addClass("row1").append(gameDiv, dateDiv, timeDiv, revealButton);
    var detailsDiv = $("<div>").addClass("details col-xs-8").text(response.data[i].general_details);
    var applyButton = $("<button>").addClass("btn btn-success").text("Apply");
    var row2 = $("<div>").addClass("row2 hidden").append(detailsDiv, applyButton).attr("reveal", i);
    var gameContainerDiv = $("<div>").addClass("game col-xs-12");
    gameContainerDiv.append(row1, row2);
    $(".gamesContainer").append(gameContainerDiv);
  }
}

/*
<div class="game col-xs-12" index=0>
<div class="row1">
    <div class="gameName truncate col-xs-6">Settlers of Catan</div>
    <div class="date col-xs-3">2017-09-13</div>
    <div class="time col-xs-3">7:30</div>
</div>
<div class="row2 hidden">
  <div class="details col-xs-8">blah blah blah it's Catan yes we roll dice no we don't play nice. Go to the second floor when you get there.</div>
  <button class="btn btn-success">Apply</button>
</div>
</div>
*/