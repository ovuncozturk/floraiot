import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'

export default class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: ''
    };
  }

  render(){
    let currentUser = this.props.currentUser;
    let userDataAvailable = (currentUser !== undefined);
    let loggedIn = (currentUser && userDataAvailable);
    return (
      <div>
        <div>
          <h1>
            { loggedIn ? 'Welcome '+currentUser.username : '' }
          </h1>
        </div>
      </div>
    );
  }
}

MainPage.PropTypes = {
  username: React.PropTypes.string
}
