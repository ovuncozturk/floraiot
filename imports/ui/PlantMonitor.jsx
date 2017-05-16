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
    let idcard, tempdaylow, tempdayhigh, tempnightlow, tempnighthigh;

    if (this.props.plantidentity.length == 1) {
      idcard = this.props.plantidentity[0].plantinfo.temperature_requirements;
      tempdaylow = idcard.daytime.min;
      tempdayhigh = idcard.daytime.max;
      tempnightlow = idcard.nighttime.min;
      tempnighthigh = idcard.nighttime.max;
    }
    else {
      idcard = "";
      tempdaylow = -20;
      tempdayhigh = 40;
      tempnightlow = -20;
      tempnighthigh = 40;
    }

    return (
      <div>
        <Flexbox flexDirection='column' justifyContent='flex-start' alignItems='flex-start'>
            <LineChartComponent plantmonitor={this.props.plantmonitor} lowerlimit={tempdaylow} upperlimit={tempdayhigh} sensorname="temperature"/>
            <LineChartComponent plantmonitor={this.props.plantmonitor} lowerlimit={70} upperlimit={90} sensorname="humidity"/>
            <LineChartComponent plantmonitor={this.props.plantmonitor} lowerlimit={20} upperlimit={80} sensorname="luminosity"/>
        </Flexbox>
      </div>
    )
  }
}

PlantMonitor.propTypes = {
  plantmonitor : React.PropTypes.array,
  plantidentity : React.PropTypes.array,
};
