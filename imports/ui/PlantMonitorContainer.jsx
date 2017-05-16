import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { PlantMonitor, Plants } from '../api/sensorreadings.js';
import PlantMonitorComponent from './PlantMonitor.jsx';

import { Provider, connect } from 'react-redux';

import Store from '../../imports/redux/store/storewithrouting';

PlantMonitorContainer = createContainer(() => {
  //Meteor.subscribe('plantmonitor');
  Meteor.subscribe('plantmonitor.machine', Store.getState().router.params.machineid, 360);
  console.log("Subscribed Plant Monitor");
  Meteor.subscribe('plantidentity', Store.getState().router.params.machineid);
  console.log("Subscribed Plant Identity");

  console.log(Store.getState().router.params);

  return {
    plantmonitor: PlantMonitor.find({id : Store.getState().router.params.machineid}).fetch(),
    plantidentity: Plants.find({ owner : Meteor.userId(), machineid: Store.getState().router.params.machineid}).fetch(),
  };
}, PlantMonitorComponent);


export default connect() (PlantMonitorContainer);
