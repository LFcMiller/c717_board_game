import React from 'react';

export default () => {
  return (
    <div className="col-md-12">
      <div className="hidden-xs hidden-sm visible-md visible-lg col-md-2">
          <img className="temp_logo display-inline" src="./imgs/temp logo.png"/>
      </div>
      <div className="margin_bottom visible-xs visible-sm hidden-md col-sm-12">
          <h1 className="font_lg">Board Game Scout</h1>
          <h4 className="font_rg">Meet-up App for Fellow Boarders Near You!</h4>
      </div>
      <div className="hidden-sm visible-md visible-lg col-md-8">
          <h1 className="font_lg">Board Game Scout</h1>
      </div>
      {/* <div class="button_container col-sm-12 col-md-12 col-md-offset-12">
          <div class="col-sm-12 col-md-3 col-md-offset-9">
              <fb:login-button class="fb-login-button col-lg-2" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false" scope="public_profile,email,picture" onlogin="checkLoginState();">
              </fb:login-button>
          </div>
      </div> */}
    </div>
  )
}