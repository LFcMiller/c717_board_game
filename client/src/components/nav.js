import React from 'react';
import { Link } from 'react-router-dom';

export default ()=>{
  return (
    <div className="topnav margin_bottom col-sm-12 col-md-12" id="myTopnav">
      <div className="col-sm-3 col-md-3"><Link to='/'>Home</Link></div>
      <div className="col-sm-3 col-md-3"><Link to='/about'>About</Link></div>
      <div className="col-sm-3 col-md-3"><Link to='/blog'>Blog</Link></div>
      <div className="col-sm-3 col-md-3"><Link to='/contact'>Contact</Link></div>
    </div>
  )
}
