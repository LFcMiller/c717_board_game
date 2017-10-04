import React from 'react';
import Facebook from './facebook';

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
      <Facebook/>
    </div>
  )
}