import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { PlantInfo } from '../api/sensorreadings.js';
import AddPlantComponent from './AddPlant.jsx';

import { Provider, connect } from 'react-redux';

import Store from '../../imports/redux/store/storewithrouting';

AddPlantContainer = createContainer(() => {
  Meteor.subscribe('plantinfo');
  console.log("Subscribed Plant Information");

  return {
    plantinfo: PlantInfo.find({}).fetch(),
  };
}, AddPlantComponent);

export default connect() (AddPlantContainer);
