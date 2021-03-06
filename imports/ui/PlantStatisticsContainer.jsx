import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { PlantStatistics } from '../api/sensorreadings.js';
import PlantStatisticsComponent from './PlantStatistics.jsx';

import { Provider, connect } from 'react-redux';

import Store from '../../imports/redux/store/storewithrouting';

PlantStatisticsContainer = createContainer(() => {
  Meteor.subscribe('plantstatistics', Store.getState().router.params.machineid);
  console.log("Subscribed Plant Statistics");

  return {
    plantstatistics: PlantStatistics.find({ id: Store.getState().router.params.machineid }).fetch(),
  };
}, PlantStatisticsComponent);

export default connect() (PlantStatisticsContainer);
