import React from 'react';

export default ()=>{
  return (
    <div className="button_container col-sm-12 col-md-12">
      <div className="col-sm-12 col-md-3 col-md-offset-9">
          <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false" scope="public_profile,email" onlogin="checkLoginState();">
          </div>
      </div>
    </div>
  )
}