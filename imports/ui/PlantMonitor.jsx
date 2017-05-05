import React, { Component, PropTypes } from 'react';
//import LineChartComponent from './LineChartComponent.jsx';

import * as V from 'victory';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';

import { Button } from 'semantic-ui-react'

import LineChartComponent from './LineChart.jsx';

import Flexbox from 'flexbox-react';
import moment from 'moment';


const styles = {
  VictoryLineChartStyle: {
    width: 1600,
    height: 400,
  },
  titleStyle: {
    fontSize: 14,
    fontFamily: 'Roboto',
  },
};

export default class PlantMonitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: null,
      clicked: null,
    };
  }

  render() {
    return (
      <div>
        <Flexbox flexDirection='column' justifyContent='flex-start' alignItems='flex-start'>
            <LineChartComponent plantmonitor={this.props.plantmonitor} lowerlimit={20} upperlimit={40} sensorname="temperature"/>
            <LineChartComponent plantmonitor={this.props.plantmonitor} lowerlimit={0} upperlimit={100} sensorname="humidity"/>
            <LineChartComponent plantmonitor={this.props.plantmonitor} lowerlimit={0} upperlimit={80} sensorname="luminosity"/>
        </Flexbox>
      </div>
    )
  }
}

PlantMonitor.propTypes = {
  plantmonitor : React.PropTypes.array,
};
