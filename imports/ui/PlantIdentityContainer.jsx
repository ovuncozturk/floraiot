import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { PlantMonitor } from '../api/sensorreadings.js';
import PlantIdentityComponent from './PlantIdentity.jsx';

export default PlantIdentityContainer = createContainer(() => {
  Meteor.subscribe('plantmonitor');
  console.log("Subscribed Plant Identity");

  return {
    plantidentity: PlantMonitor.find({},{sort: {date : -1}, limit: 10}).fetch(),
  };
}, PlantIdentityComponent);
