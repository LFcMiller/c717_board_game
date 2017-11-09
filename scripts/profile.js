$(document).ready(() => {
$(".submitChanges").on("click", submitData); //add click handler to submit profile revisions
  $(".editInfo").on("click", toggleHidden); //add click handler to toggle edit mode or display mode
$("#fav_genre").on('change', changeIcon);

})
/**
 * Ajax call to pull data related to user from database
 * @param none
 * @return {Promise} 
 */
const pullUserData = () => {
  let deferred = $.Deferred();
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
const updateUserData = () => {
  let deferred = $.Deferred();
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
const submitData = () => {
  updateUserData().then(response => { //update user data in database, then
    setUserValues(response); //set user value in DOM elements
    toggleHidden(); //toggle state from edit mode to display mode
  })
  
}
/**
 * Function to toggle between edit mode and display mode in DOM
 * @param none
 * @return {undefined} 
 */
const toggleHidden = () => {
  $("#personalInfo > p > *").toggleClass("hidden");
  $("#personalInfo > button").toggleClass("hidden");
}
/**
 * Function to insert user data into elements on DOM and set inputs' initial values
 * @param {Object} response
 * @return {undefined} 
 */
const setUserValues = response => {
  $(".profilePicture").attr("src", profile_pic); //set profile picture URL

  //set User data displays and initial input values on edit mode
  $(".name").text(response.data.first_name);
  $("#first_name").attr("value", response.data.first_name);
  $(".genre").text(response.data.fav_genre);
  $("#fav_genre option[value="+response.data.fav_genre+"]").attr('selected','selected');
  $(".about").text(response.data.about_me);
  $("#about_me").text(response.data.about_me);

  let pastGames = response.data.past_games; //save past games to variable
  $(".pastGamesTable").empty(); //clear any existing data about previous games
  if(pastGames.length > 0){ //if prior games exist, create entries for them in table on DOM
    for(let i = 0; i < pastGames.length; i++){
      let gameRow = $("<tr>");
      let gameName = $("<td>").text(pastGames[i].game_name);
      let gameCount = $("<td>").text(pastGames[i].frequency)
      gameRow.append(gameName, gameCount);
      $(".pastGamesTable").append(gameRow);
    }
  }
}

//Soy: this is an array of all the tiles with their genre
//factory function to create tile with src and title
//added "$("#fav_genre").on('change', changeIcon);" on document.ready
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