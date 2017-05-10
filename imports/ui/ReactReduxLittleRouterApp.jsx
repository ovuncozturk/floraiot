//import { BrowserRouter, Route, Switch, IndexRoute, Link, Redirect } from 'react-router-dom'
//import createHistory from 'history/createBrowserHistory';

import React, { Component, PropTypes } from 'react';
//import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Store from '../../imports/redux/store/store';

import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import Flexbox from 'flexbox-react';
import { Menu, Card, Icon, Image } from 'semantic-ui-react';

import '../../imports/stylesheets/semantic.css'

import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { push,routerForBrowser, initializeCurrentLocation,initialState, Fragment, RouterProvider, Link } from 'redux-little-router';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';


import App from './App.jsx';
import PlantDashboardContainer from './PlantDashboardContainer.jsx';
import AppContainer from './containers/AppContainer.jsx';
import MainContainer from './containers/MainContainer.jsx';
import PlantMonitorContainer from './PlantMonitorContainer.jsx';
import PlantIdentityContainer from './PlantIdentityContainer.jsx';
import PlantStatisticsContainer from './PlantStatisticsContainer.jsx';
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import LoginPageAlt from './pages/LoginPageAlt.jsx'

// Exported from redux-devtools
import { createDevTools } from 'redux-devtools';

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  // Note: DockMonitor is visible by default.
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               defaultIsVisible={true}>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);


import constraintReducer from '../redux/reducers/constraintReducer.js';

// Define your routes in a route-to-anything hash like below.
// The value of the route key can be any serializable data.
// This data gets attached to the `router` key of the state
// tree when its corresponding route is matched and dispatched.
// Useful for page titles and other route-specific data.

// Uses https://github.com/snd/url-pattern for URL matching
// and parameter extraction.
const routes = {
  '/': {},
  '/foo': {
    '/bar': {},
    '/zar': {},
  },
}

// Install the router into the store for a browser-only environment.
// routerForBrowser is a factory method that returns a store
// enhancer and a middleware.
const {
  reducer,
  enhancer,
  middleware
} = routerForBrowser({ routes });

const logger = createLogger();

const enhancers = [
  enhancer,
  applyMiddleware(middleware, ReduxThunk, logger),
  DevTools.instrument()
];

const clientOnlyStore = createStore(
  combineReducers({ router: reducer, constraintReducer }),
  initialState,
  compose(...enhancers)
);


const store = createStore(
  combineReducers({ router: reducer }),
  // If this is a server render, we grab the
  // initial state the hbs template inserted
  window.__INITIAL_STATE || {},
  compose(
    enhancer,
    applyMiddleware(middleware),
    window.devToolsExtension ?
      window.devToolsExtension() : f => f
  )
);
//
// // ...after creating your store
// const initialLocation = clientOnlyStore.getState().router;
// if (initialLocation) {
//   clientOnlyStore.dispatch(initializeCurrentLocation(initialLocation));
// }


export default class ReactReduxLittleRouterApp extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log("Rendering");
    return (

      <RouterProvider store={store}>
        <Provider store={store}>
          <Fragment forRoute='/foo'>
            <div>
              Matches /foo and everything deeper
              <Fragment forRoute='/bar'>
                <h1>Matches /foo/bar</h1>
              </Fragment>
              <Fragment forRoute='/zar'>
                <h1>Matches /foo/zar</h1>
              </Fragment>
            </div>
          </Fragment>

        </Provider>
      </RouterProvider>
    );
  }
}
