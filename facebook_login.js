var facebook_id = '';
var facebook_name = '';
var facebook_email = '';


function sendFacebookData(response){
  $.ajax({
      url: './3plus_table_solution/player_input_decision_maker.php',
      method: "POST",
      dataType: "json",
      data: {
        fb_ID: facebook_id,
        name: facebook_name,
        email: facebook_email
      },
      success: function(response){
        console.log(response);
      }
  });
}
