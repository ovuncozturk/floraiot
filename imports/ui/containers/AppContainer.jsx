import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router'
import { Menu, Card, Icon, Image } from 'semantic-ui-react';

import '../../../imports/stylesheets/semantic.css'
import Flexbox from 'flexbox-react';

export default class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = this.getMeteorData();
    this.logout = this.logout.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);

  }

  getMeteorData(){
    return { activeItem: "editorials", isAuthenticated: Meteor.userId() !== null };
  }

  componentWillMount(){
    if (!this.state.isAuthenticated) {
      browserHistory.push('/login');
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (!this.state.isAuthenticated) {
      browserHistory.push('/login');
    }
  }

  logout(e){
    e.preventDefault();
    Meteor.logout( (err) => {
        if (err) {
            console.log( err.reason );
        } else {
            browserHistory.push('/login');
        }
    });
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name, isAuthenticated: Meteor.userId() !== null });
    browserHistory.push('plantmonitor');
    console.log("Pushing");
  }

  render(){
    return (
      <Flexbox flexDirection='column'>
        <Menu>
          <Menu.Item
            name='editorials'
            active={this.state.activeItem === 'editorials'}
            onClick={this.handleItemClick}
            >
            Editorials
          </Menu.Item>

          <Menu.Item
            name='reviews'
            active={this.state.activeItem === 'reviews'}
            onClick={this.handleItemClick}
            >
            Reviews
          </Menu.Item>

          <Menu.Item
            name='upcomingEvents'
            active={this.state.activeItem === 'upcomingEvents'}
            onClick={this.handleItemClick}
            >
            Upcoming Events
          </Menu.Item>
        </Menu>
        {this.props.children}
      </Flexbox>
    );
  }
}
