var user_ID;
var profile_pic;

function sendFacebookData(response){
  var deferred = $.Deferred();
  profile_pic = response.picture.data.url;
  console.log("Profile Picture: ", profile_pic);  
  $.ajax({
      url: './back_end/player_input_decision_maker.php?action=relateOrCreateUser',
      method: "POST",
      dataType: "json",
      data: {
        fb_ID: response.id,
        first_name: response.name,
        email: response.email
      },
      success: deferred.resolve,
      error: deferred.reject
  });
  return deferred;
}

function processFacebookData(response){
  console.log('Facebook Success!',response);
  user_ID = response.data.user_ID;
  // profile_pic =
  return user_ID;
}

function errorHandler(response){
  console.log('Facebook Error:',response)
}


