import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Plants } from '../api/plants.js';
import PlantDashboardComponent from './PlantDashboard.jsx';


import moment from 'moment';

export default PlantDashboardContainer = createContainer(() => {
  Meteor.subscribe('plants');
  console.log("Subscribed Plant Dashboard");
  return {
    plants: Plants.find({}).fetch(),
    plantswithtype: Plants.find({}).fetch(),
    plantcount: Plants.find({}).count(), 
  };
}, PlantDashboardComponent);
