$(document).ready(function(){
  $(".submitChanges").on("click", submitData); //add click handler to submit profile revisions
  $(".editInfo").on("click", toggleHidden); //add click handler to toggle edit mode or display mode
});
/**
 * Ajax call to pull data related to user from database
 * @param none
 * @return {Promise} 
 */
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
/**
 * Function to update user data in database after editing
 * @param none
 * @return {Promise} 
 */
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
/**
 * Function to submit user data after editing by user
 * @param none
 * @return {undefined} 
 */
function submitData(){
  updateUserData().then((response)=>{ //update user data in database, then
    setUserValues(response); //set user value in DOM elements
    toggleHidden(); //toggle state from edit mode to display mode
  })
  
}
/**
 * Function to toggle between edit mode and display mode in DOM
 * @param none
 * @return {undefined} 
 */
function toggleHidden(){
  $("#personalInfo > p > *").toggleClass("hidden");
  $("#personalInfo > button").toggleClass("hidden");
}
/**
 * Function to insert user data into elements on DOM and set inputs' initial values
 * @param {Object} response
 * @return {undefined} 
 */
function setUserValues(response){
  $(".profilePicture").attr("src", profile_pic); //set profile picture URL

  //set User data displays and initial input values on edit mode
  $(".name").text(response.data.first_name);
  $("#first_name").attr("value", response.data.first_name);
  $(".genre").text(response.data.fav_genre);
  $("#fav_genre option[value="+response.data.fav_genre+"]").attr('selected','selected');
  $(".about").text(response.data.about_me);
  $("#about_me").text(response.data.about_me);

  var pastGames = response.data.past_games; //save past games to variable
  $(".pastGamesTable").empty(); //clear any existing data about previous games
  if(pastGames.length > 0){ //if prior games exist, create entries for them in table on DOM
    for(var i = 0; i < pastGames.length; i++){
      var gameRow = $("<tr>");
      var gameName = $("<td>").text(pastGames[i].game_name);
      var gameCount = $("<td>").text(pastGames[i].frequency);
      gameRow.append(gameName, gameCount);
      $(".pastGamesTable").append(gameRow);
    }
  }
}