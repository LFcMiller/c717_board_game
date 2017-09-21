$(document).ready(()=>{
  $("#submit").on("click", groupData);
});

function groupData(){
  var result = {
    game_name: $("#gameName").val(),
    num_players: $("#numPlayers").val(),
    street_address: $("#address").val(),
    city: $("#city").val(),
    state: $("#state").val(),
    zip: $("#zipcode").val(),
    general_details: $("#textDetails").val(),
    date: $("#date").val(),
    time: $("#time").val(),
    dayNight: $("#dayNight").val()
  };
  console.log(result);
}

// function sendData(){
//   $.ajax({
//     url: 
//   })
// }