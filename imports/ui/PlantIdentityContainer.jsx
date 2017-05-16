import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { PlantMonitor, Plants } from '../api/sensorreadings.js';

import PlantIdentityComponent from './PlantIdentity.jsx';

import { Provider, connect } from 'react-redux';

import Store from '../../imports/redux/store/storewithrouting';

PlantIdentityContainer = createContainer(() => {
  Meteor.subscribe('plantidentity', Store.getState().router.params.machineid);
  console.log("Subscribed Plant Identity");

  return {
    plantidentity: Plants.find({ owner : Meteor.userId(), machineid: Store.getState().router.params.machineid}).fetch(),
  };
}, PlantIdentityComponent);

export default connect() (PlantIdentityContainer);
