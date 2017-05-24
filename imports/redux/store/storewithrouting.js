import React from 'react';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import constraintReducer from '../../../imports/redux/reducers/constraintReducer';
import unitReducer from '../../../imports/redux/reducers/unitReducer';

// Exported from redux-little-router
import { push,routerForBrowser, initializeCurrentLocation,initialState, Fragment, RouterProvider, Link } from 'redux-little-router';

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

// Define your routes in a route-to-anything hash like below.
// The value of the route key can be any serializable data.
// This data gets attached to the `router` key of the state
// tree when its corresponding route is matched and dispatched.
// Useful for page titles and other route-specific data.

// Uses https://github.com/snd/url-pattern for URL matching
// and parameter extraction.
const routes = {
  '/': {},
  '/monitor/:machineid': {},
  '/dashboard': {},
  '/signup': {},
  '/signin': {},
  '/addplant': {},
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

// Define actions

const rootReducer = function(state = {}, action = {}) {
  return {
      query: constraintReducer(state.query, action),
      unitSystem : unitReducer(state.unitSystem, action)
  }
};

// Create store

const logger = createLogger();

const enhancers = [
  enhancer,
  applyMiddleware(middleware, ReduxThunk, logger),
  window.devToolsExtension ?
      window.devToolsExtension() : f => f
];

const Store = createStore(
  combineReducers({ router: reducer, rootReducer }),
  window.__INITIAL_STATE || {},
  compose(...enhancers)
);

export default Store;
