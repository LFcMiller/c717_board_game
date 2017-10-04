import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render(){
    return (
      <div className="margin_bottom col-sm-12 col-md-12">
        <div className="index-boxes form-group col-sm-12 col-md-6">
          <label className="col-sm-12 col-md-12 col-lg-12">Search:</label>
          <div className=" col-sm-12 col-md-12 col-lg-6 col-lg-offset-3">
            <form action="">
              <input type="number" className="form-control" id="exampleInputZipCode" placeholder="ZIPCODE" pattern=".{3,}" required name="zip"/>
              <button className="col-sm-12 col-md-12 col-lg-6 col-lg-offset-3 btn btn-md btn-primary">Games Near You</button>
            </form>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <h4>Assemble your fellows!</h4>
          <Link to="/createevent" className="btn btn-lg btn-warning">Host Game Event</Link>
        </div>
      </div>
    )
  }
}

export default Home;