/**
 * Global variable to store id of user received from database after lookup using Facebook ID
 * @Global {String}
 */
let user_ID;
/**
 * Global variable to store the url for user's profile picture
 * @Global {String}
 */
let profile_pic;
/**
 * Function to send Facebook Login data to databse to check if user already exists
 * @param {Object} response
 * @return {Promise} 
 */
const sendFacebookData = response => {
  let deferred = $.Deferred();
  profile_pic = response.picture.data.url;
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
/**
 * Function to save user ID after user lookup or creation
 * @param {Object} response
 * @return {Number} user_ID 
 */
const processFacebookData = response => {
  user_ID = response.data.user_ID;
  // profile_pic =
  return user_ID;
}
/**
 * Function to display any error received from Facebook
 * @param {Object} response
 * @return {undefined} 
 */
const errorHandler = response => {
  console.log('Facebook Error:', response)
}


