
function sendData(){
  event.preventDefault();
  var result = {
    game_name: $("#gameName").val(),
    num_players: $("#numPlayers").val(),
    street_address: $("#address").val(),
    city: $("#city").val(),
    state: $("#state").val(),
    zip: $("#zipcode").val(),
    general_details: $("#textDetails").val(),
    date: $("#year").val()+"-"+$("#month").val()+"-"+$("#day").val(),
    time: $("#time").val(),
    dayNight: $("#dayNight").val()
  };
  console.log(result);
  // $.ajax({
  //   url: 
  // })
}