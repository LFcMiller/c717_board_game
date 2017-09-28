
function sendFacebookData(response){
  console.log('sendFacebookData');
  $.ajax({
      url: './3plus_table_solution/player_input_decision_maker.php?action=relateOrCreateUser',
      method: "POST",
      dataType: "json",
      data: {
        fb_ID: response.id,
        first_name: response.name,
        email: response.email
      },
      success: function(response){
        console.log('success',response);
      },
      error: function(response){
        console.log('errorrrrrrrrrrrrrrrr',response);
      }
  });
}
