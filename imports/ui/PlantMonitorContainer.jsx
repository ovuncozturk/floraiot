import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { PlantMonitor } from '../api/sensorreadings.js';
import PlantMonitorComponent from './PlantMonitor.jsx';

import { push, replace, go, goBack, goForward, RouterProvider, Link } from 'redux-little-router';
import { Provider, connect } from 'react-redux';

import Store from '../../imports/redux/store/storewithrouting';

import moment from 'moment';

PlantMonitorContainer = createContainer(() => {
  Meteor.subscribe('plantmonitor');
  Meteor.subscribe('plantmonitor.machine', Store.getState().router.params.machineid);
  console.log("Subscribed Plant Monitor");

  console.log(Store.getState().router.params);

  return {
    plantmonitor: PlantMonitor.find({id : Store.getState().router.params}).fetch(),
  };
}, PlantMonitorComponent);


export default connect() (PlantMonitorContainer);
