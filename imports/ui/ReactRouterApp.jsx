import { BrowserRouter, Route, Switch, IndexRoute, Link, Redirect } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';

import React, { Component, PropTypes } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Store from '../../imports/redux/store/store';

import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import Flexbox from 'flexbox-react';
import { Menu, Card, Icon, Image } from 'semantic-ui-react';

import '../../imports/stylesheets/semantic.css'


import App from './App.jsx';
import AppContainer from './containers/AppContainer.jsx';
import MainContainer from './containers/MainContainer.jsx';
import PlantMonitorContainer from './PlantMonitorContainer.jsx';
import PlantIdentityContainer from './PlantIdentityContainer.jsx';
import PlantStatisticsContainer from './PlantStatisticsContainer.jsx';
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Meteor.userId() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    !Meteor.userId() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/monitor',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

export default class ReactRouterApp extends Component {
  render() {
    console.log("Rendering");
    console.log(Store);
    return (
      <BrowserRouter history={ createHistory() }>
        <Flexbox flexDirection='column' justifyContent='center'>
          <Menu fluid widths={4} size='large'>
            <Menu.Item
              name='dashboard'
              active={false}
              onClick={this.handleItemClick}
              >
              <Link to="/dashboard">
                Plant Dashboard
              </Link>
            </Menu.Item>

            <Menu.Item
              name='monitor'
              active={true}
              onClick={this.handleItemClick}
              >
              <Link to="/monitor">
                Monitor Plant
              </Link>
            </Menu.Item>

            <Menu.Item
              name='signup'
              active={false}
              onClick={this.handleItemClick}
              >
              <Link to="/signup">
                Sign Up
              </Link>
            </Menu.Item>

            <Menu.Item
              name='upcomingEvents'
              active={false}
              onClick={this.handleItemClick}
              >
              <Link to="/login">
                Sign In
              </Link>
            </Menu.Item>

            <Menu.Item
              name='Plant Repository'
              active={false}
              onClick={this.handleItemClick}
              >
              <Link to="/signup">
                Upcoming Events
              </Link>
            </Menu.Item>
          </Menu>

          <PrivateRoute path='/dashboard' exact component={App}/>
          <PrivateRoute path='/monitor' exact component={App}/>
          <AuthRoute path="/login" component={LoginPage}/>
          <AuthRoute path="/signup" component={SignupPage}/>
        </Flexbox>


      </BrowserRouter>
    );
  }
}
