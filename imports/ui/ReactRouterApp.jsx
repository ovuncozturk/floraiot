import { BrowserRouter, Route, Switch, IndexRoute, Link } from 'react-router-dom'

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


export default class ReactRouterApp extends Component {
  render() {
    console.log("Rendering");
    console.log(Store);
    return (
      <BrowserRouter history={ createHistory() }>
        <Flexbox flexDirection='column' justifyContent='center'>
          <Menu fluid widths={3} size='large'>
            <Menu.Item
              name='editorials'
              active={true}
              onClick={this.handleItemClick}
              >
              <Link to="/monitor">
                Editorials
              </Link>
            </Menu.Item>

            <Menu.Item
              name='reviews'
              active={false}
              onClick={this.handleItemClick}
              >
              <Link to="/login">
                Reviews
              </Link>
            </Menu.Item>

            <Menu.Item
              name='upcomingEvents'
              active={false}
              onClick={this.handleItemClick}
              >
              <Link to="/signup">
                Upcoming Events
              </Link>
            </Menu.Item>
          </Menu>

          <Route path='/monitor' component={App}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={SignupPage}/>
        </Flexbox>


      </BrowserRouter>
    );
  }
}
