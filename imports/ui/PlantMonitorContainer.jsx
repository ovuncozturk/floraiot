import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { PlantMonitor } from '../api/sensorreadings.js';
import PlantMonitorComponent from './PlantMonitor.jsx';

import { push, replace, go, goBack, goForward, RouterProvider, Link } from 'redux-little-router';
import { Provider, connect } from 'react-redux';

import moment from 'moment';

export default PlantMonitorContainer = createContainer(() => {
  Meteor.subscribe('plantmonitor');
  console.log("Subscribed Plant Monitor");

  return {
    plantmonitor: PlantMonitor.find({}).fetch(),
  };
}, PlantMonitorComponent);
