import React, { Component, PropTypes } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import Store from '../../imports/redux/store/store';

import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import Flexbox from 'flexbox-react';

import PlantMonitorContainer from './PlantMonitorContainer.jsx';
import PlantIdentityContainer from './PlantIdentityContainer.jsx';
import PlantStatisticsContainer from './PlantStatisticsContainer.jsx';


export default class App extends Component {

  render() {
    console.log("Rendering");
    console.log(this.props.match.params.deviceid);
    //console.log(parseInt(this.props.params.deviceid, 10));
    console.log(Store);
    return (
          <Flexbox flexDirection='row' justifyContent='center'>
              <PlantIdentityContainer/>
              <Provider store={Store}>
                <PlantMonitorContainer/>
              </Provider>
              <Provider store={Store}>
                <PlantStatisticsContainer/>
              </Provider>
          </Flexbox>
    );
  }
}
