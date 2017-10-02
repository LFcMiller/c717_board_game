import React, { Component } from 'react';
import { connect } from "react-redux";
import { exampleAction } from '../actions'

class TestComponent extends Component {
  render(){
    console.log(this.props);
    return (
      <div>
        <h1>{this.props.message}</h1>
        <button onClick={this.props.exampleAction}>Update Message</button>
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log("State: ", state)
  return {
    message: state.reduced_actions.message
  }
}

export default connect(mapStateToProps, { exampleAction })(TestComponent);