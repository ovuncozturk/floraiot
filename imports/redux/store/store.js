import React from 'react';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import constraintReducer from '../../../imports/redux/reducers/constraintReducer';
import unitReducer from '../../../imports/redux/reducers/unitReducer';

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
  applyMiddleware(ReduxThunk, logger),
  DevTools.instrument()
];

const Store = createStore(rootReducer, {query:{constraints:[], countOfConstraints: 0}, unitSystem: 'Metric Units'}, compose(...enhancers));

export default Store;
