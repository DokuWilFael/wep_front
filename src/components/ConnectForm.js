import React, { Component } from 'react';

import { connect } from 'react-redux';

import { connectUser, connectUserId, handleConnected }
  from '../actions/actions.js';

import { getAllUser } from './RequestManager.js';

import { findUser } from './Utils.js';

class ConnectForm extends Component{
  constructor(props){
    super(props);
    
    this.state={
      user: ''
    };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Username" onChange={this.handleUserChange}>
        </input>
        <input type='submit' value='Connect' />
      </form>
    );
  }

  handleUserChange(e){
    this.setState({user:e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    getAllUser().then(
      data => {
        var id = findUser(this.state.user,data);
        if(id===-1){
          alert('User does not exist');
        }else{
          this.props.connectUser(this.state.user);
          this.props.handleConnected(true);
          this.props.connectUserId(id);
        }
      }
    );
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    connectUser: (value) => {dispatch(connectUser(value))},
    connectUserId: (value) => {dispatch(connectUserId(value))},
    handleConnected: (value) => {dispatch(handleConnected(value))}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (ConnectForm);
