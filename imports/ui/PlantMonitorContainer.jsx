import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { PlantMonitor, Plants } from '../api/sensorreadings.js';
import PlantMonitorComponent from './PlantMonitor.jsx';

import R from 'ramda';

import { Provider, connect } from 'react-redux';

import Store from '../../imports/redux/store/storewithrouting';

PlantMonitorContainer = createContainer(() => {
  //Meteor.subscribe('plantmonitor');
  Meteor.subscribe('plantmonitor.machine', Store.getState().router.params.machineid, 360);
  console.log("Subscribed Plant Monitor");
  Meteor.subscribe('plantidentity', Store.getState().router.params.machineid);
  console.log("Subscribed Plant Identity");

  let plantmonitor = PlantMonitor.find({id : Store.getState().router.params.machineid}).fetch().reverse();
  //let tickValues = R.map( x => new Date(x) , R.uniq(R.map(x => x.date.setSeconds(0,0), R.filter( x => x.date.getMinutes() % 10 === 0 , plantmonitor))))
  console.log(Store.getState().router.params);


  return {
    plantmonitor: plantmonitor,
    plantidentity: Plants.find({ owner : Meteor.userId(), machineid: Store.getState().router.params.machineid}).fetch(),
  };
}, PlantMonitorComponent);


export default connect() (PlantMonitorContainer);
