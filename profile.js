$(document).ready(function(){
  $(".submitChanges").on("click", submitData)
  $(".editInfo").on("click", toggleHidden)
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
  })
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
  })
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