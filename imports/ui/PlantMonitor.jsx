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
    let idcard, tempdaylow, tempdayhigh, tempnightlow, tempnighthigh, lightmin, lightmax, soilmoisturemin, soilmoisturemax;

    if (this.props.plantidentity.length == 1) {
      idcard = this.props.plantidentity[0].plantinfo.ideal_conditions;
      tempdaylow = idcard.temp.daytime.min;
      tempdayhigh = idcard.temp.daytime.max;
      tempnightlow = idcard.temp.nighttime.min;
      tempnighthigh = idcard.temp.nighttime.max;
      lightmin = idcard.light.min;
      lightmax = idcard.light.max;
      soilmoisturemin = idcard.soil_moisture.min;
      soilmoisturemax = idcard.soil_moisture.max;
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
            <LineChartComponent plantmonitor={this.props.plantmonitor} lowerlimit={soilmoisturemin} upperlimit={soilmoisturemax} sensorname="humidity"/>
            <LineChartComponent plantmonitor={this.props.plantmonitor} lowerlimit={lightmin} upperlimit={lightmax} sensorname="luminosity"/>
        </Flexbox>
      </div>
    )
  }
}

PlantMonitor.propTypes = {
  plantmonitor : React.PropTypes.array,
  plantidentity : React.PropTypes.array,
};
