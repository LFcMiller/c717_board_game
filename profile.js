$(document).ready(function(){
  $(".submitChanges").on("click", submitData)
  $(".editInfo").on("click", toggleHidden);
  $("#fav_genre").on('change', changeIcon);
})

function pullUserData(){
  var deferred = $.Deferred();
  $.ajax({
    url: "./back_end/player_input_decision_maker.php?action=retrievePublicProfile",
    method: "POST",
    dataType: "json",
    data: {
      user_ID: user_ID
    },
    success: deferred.resolve,
    error: deferred.reject
  });
  return deferred;
}

function updateUserData(){
  var deferred = $.Deferred();
  $.ajax({
    url: "./back_end/player_input_decision_maker.php?action=updateProfile",
    method: "POST",
    dataType: "json",
    data: {
      user_ID: user_ID,
      first_name: $("#first_name").val(),
      fav_genre: $("#fav_genre").val(),
      about_me: $("#about_me").val()
    },
    success: deferred.resolve,
  });
  return deferred;
}

function submitData(){
  updateUserData().then((response)=>{
    setUserValues(response);
    toggleHidden();
  })
  
}

function toggleHidden(){
  $("#personalInfo > p > *").toggleClass("hidden");
  $("#personalInfo > button").toggleClass("hidden");
}

function setUserValues(response){
  console.log("User information: ",response);
  $(".profilePicture").attr("src", profile_pic);

  $(".name").text(response.data.first_name);
  $("#first_name").attr("value", response.data.first_name);
  $(".genre").text(response.data.fav_genre);
  $("#fav_genre option[value="+response.data.fav_genre+"]").attr('selected','selected');
  $(".about").text(response.data.about_me);
  $("#about_me").text(response.data.about_me);



  var pastGames = response.data.past_games;
  $(".pastGamesTable").empty();
  if(pastGames.length > 0){
    for(var i = 0; i < pastGames.length; i++){
      var gameRow = $("<tr>");
      var gameName = $("<td>").text(pastGames[i].game_name);
      var gameCount = $("<td>").text(pastGames[i].frequency)
      gameRow.append(gameName, gameCount);
      $(".pastGamesTable").append(gameRow);
    }
  }
}

//this is an array of all the tiles with their genre

//factory function to create tile with src and title
var createTile = function(src, title, value){
  var img = {
    src: src,
    title: title,
    value: value
  };
  return img;
};


var tileDictionary = {};

tileDictionary.Abstract = createTile("imgs/abstract-tile.svg","abstract","Abstract");
tileDictionary.Dexterity = createTile("imgs/dexterity-tile.svg","dexterity","Dexterity");
tileDictionary.Eurogames = createTile("imgs/euro-tile.svg","euro","Eurogames");
tileDictionary.Family = createTile("imgs/family-tile.svg","family","Family");
tileDictionary.Thematic = createTile("imgs/theme-tile.svg","theme","Thematic");
tileDictionary.Wargames = createTile("imgs/war-tile.svg","war","Wargames");
tileDictionary.Party = createTile("imgs/party-tile.svg","party","Party");


function changeIcon(){
  var type = $(this).val();

  if(tileDictionary[type]) {
      $("#genre_tile").attr('src', tileDictionary[type].src).attr('alt',tileDictionary[type].title);
  }

};




