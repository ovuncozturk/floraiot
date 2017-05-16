import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Plants, SystemStatistics } from '../api/sensorreadings.js';
import PlantDashboardComponent from './PlantDashboard.jsx';

import { Provider, connect } from 'react-redux';

import moment from 'moment';


import Store from '../../imports/redux/store/storewithrouting';

PlantDashboardContainer = createContainer(() => {
  Meteor.subscribe('plants');
  Meteor.subscribe('systemstatistics');
  console.log("Subscribed Plant Dashboard");
  console.log("Subscribed System Statistics");
  console.log(SystemStatistics.find({}).fetch());

  console.log(Store.getState().router.params);

  return {
    plants: Plants.find({}).fetch(),
    plantswithtype: Plants.find({}).fetch(),
    plantcount: Plants.find({}).count(),
    systemstatistics : SystemStatistics.find({}).fetch(),
  };
}, PlantDashboardComponent);

export default connect() (PlantDashboardContainer);
