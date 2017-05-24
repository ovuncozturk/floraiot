import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { PlantHealth } from '../api/sensorreadings.js';
import PlantHealthComponent from './PlantHealth.jsx';

import moment from 'moment';

import { Provider, connect } from 'react-redux';

import Store from '../../imports/redux/store/storewithrouting';

PlantHealthContainer = createContainer(() => {

  let s = moment().subtract(1, 'days').startOf('day').toDate();
  Meteor.subscribe('planthealth', Store.getState().router.params.machineid,s, 'day');
  console.log("Subscribed Plant Health");

  return {
    planthealth: PlantHealth.find({ id: Store.getState().router.params.machineid , start: s, duration: 'day' }).fetch(),
  };
}, PlantHealthComponent);

export default connect() (PlantHealthContainer);
