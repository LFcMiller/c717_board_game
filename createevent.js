$(document).ready(()=>{
  $("#submit").on("click", groupData);
});

function groupData(){
  var result = {
    gameName: $("#gameName").val(),
    numPlayers: $("#numPlayers").val(),
    address: $("#address").val(),
    city: $("#city").val(),
    state: $("#state").val(),
    zipcode: $("#zipcode").val(),
    textDetails: $("#textDetails").val(),
    date: $("#date").val(),
    time: $("#time").val(),
  };
  console.log(result);
}