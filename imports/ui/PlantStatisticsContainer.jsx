import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { PlantStatistics } from '../api/sensorreadings.js';
import PlantStatisticsComponent from './PlantStatistics.jsx';

export default PlantStatisticsContainer = createContainer(() => {
  Meteor.subscribe('plantstatistics', {
    onReady: function () { console.log("onReady And the Items actually Arrive", arguments); },
    onError: function () { console.log("onError", arguments); }
  });
  console.log("Subscribed Plant Statistics");

  return {
    plantstatistics: PlantStatistics.find({}).fetch(),
  };
}, PlantStatisticsComponent);
