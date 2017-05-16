//import { BrowserRouter, Route, Switch, IndexRoute, Link, Redirect } from 'react-router-dom'
//import createHistory from 'history/createBrowserHistory';

import React, { Component, PropTypes } from 'react';
//import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Store from '../../imports/redux/store/storewithrouting';

import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import Flexbox from 'flexbox-react';
import { Menu, Card, Icon, Image } from 'semantic-ui-react';

import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { push,routerForBrowser, initializeCurrentLocation,initialState, Fragment, RouterProvider, Link } from 'redux-little-router';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import PlantDashboardContainer from './PlantDashboardContainer.jsx';
import PlantMonitorContainer from './PlantMonitorContainer.jsx';
import PlantIdentityContainer from './PlantIdentityContainer.jsx';
import PlantStatisticsContainer from './PlantStatisticsContainer.jsx';
import Login from './Login.jsx'


import '../stylesheets/semantic.min.css'

export default class ReactReduxLittleRouterApp extends Component {
  constructor(props){
    super(props);
    this.state = { activeItem: 'login'};
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(event,data) {
    event.preventDefault();
    if (data.name === 'logout') {
      console.log(Meteor.user());
      Meteor.logout(function(err){
        Store.dispatch(push('/signin'));
        this.setState({ activeItem: 'signin' });
      });
    }
    else
      this.setState({ activeItem: data.name });
  };

  render() {
    console.log("Rendering");
    return (
      <RouterProvider store={Store}>
        <Provider store={Store}>
          <Flexbox flexDirection='column' justifyContent='center'>
            <Menu fluid widths={ 3 } size='large'>
              <Fragment forRoute='/' withConditions={ location => Meteor.userId() !== null }>
                <Menu.Item
                  name='dashboard'
                  active={this.state.activeItem === 'dashboard'}
                  onClick={this.handleItemClick}
                  >
                  <Link href='/dashboard'>
                    Plant Dashboard
                  </Link>
                </Menu.Item>
              </Fragment>
              <Fragment forRoute='/' withConditions={ location => Meteor.userId() !== null }>
                <Menu.Item
                  name='monitor'
                  active={this.state.activeItem === 'monitor'}
                  onClick={this.handleItemClick}
                  >
                  <Link href="/monitor">
                    Plant Monitor
                  </Link>
                </Menu.Item>
              </Fragment>

              <Fragment forRoute='/' withConditions={ location => Meteor.userId() === null }>
                <Menu.Item
                  name='signup'
                  active={this.state.activeItem === 'signup'}
                  onClick={this.handleItemClick}
                  >
                  <Link href="/signup">
                    Sign Up
                  </Link>
                </Menu.Item>
              </Fragment>

              <Fragment forRoute='/' withConditions={ location => Meteor.userId() === null }>
                <Menu.Item
                  name='signin'
                  active={this.state.activeItem === 'signin'}
                  onClick={this.handleItemClick}
                  >
                  <Link href="/signin">
                    Sign In
                  </Link>
                </Menu.Item>
              </Fragment>

              <Fragment forRoute='/' withConditions={ location => Meteor.userId() !== null }>
                <Menu.Item
                  name='logout'
                  active={this.state.activeItem === 'signin'}
                  onClick={this.handleItemClick}
                  >
                </Menu.Item>
              </Fragment>
            </Menu>
            <Fragment forRoute='/dashboard'>
              <div>
                <PlantDashboardContainer/>
              </div>
            </Fragment>
            <Fragment forRoute='/monitor/:machineid'>
              <div>
                <Flexbox flexDirection='row' justifyContent='center'>
                  <PlantIdentityContainer/>
                  <PlantMonitorContainer/>
                  <PlantStatisticsContainer/>
                </Flexbox>
              </div>
            </Fragment>
            <Fragment forRoute='/signin' withConditions={ location => Meteor.userId() === null }>
              <div>
                <Login/>
              </div>
            </Fragment>
            <Fragment forRoute='/signup' withConditions={ location => Meteor.userId() === null }>
              <div>
                <h1>Signup</h1>
              </div>
            </Fragment>
          </Flexbox>
        </Provider>
      </RouterProvider>
    );
  }
}
