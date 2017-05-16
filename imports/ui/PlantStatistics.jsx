import React, { Component, PropTypes } from 'react';
//import LineChartComponent from './LineChartComponent.jsx';

import * as V from 'victory';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryPie } from 'victory';

import { Icon, Image, List, Statistic } from 'semantic-ui-react'

import LineChartComponent from './LineChart.jsx';

import Flexbox from 'flexbox-react';

const styles = {
};

export default class PlantStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: null,
      clicked: null,
    };
  }

  render() {
    let temperature,humdity,luminosity;

    if (this.props.plantstatistics.length == 1) {
      temperature = this.props.plantstatistics[0].temperature.toFixed(2);
      humidity    = this.props.plantstatistics[0].humidity.toFixed(2);
      luminosity  = this.props.plantstatistics[0].luminosity.toFixed(2);
    }
    else {
      temperature = "Please Wait...";
      humidity    = "Please Wait...";
      luminosity  = "Please Wait...";
    }
    console.log(this.props.plantstatistics);

    return (
      <Flexbox flexDirection='column'>
        <Statistic>
          <Statistic.Value>{temperature}</Statistic.Value>
          <Statistic.Label>Temperature</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{humidity}</Statistic.Value>
          <Statistic.Label>Humidity</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{luminosity}</Statistic.Value>
          <Statistic.Label>Luminosity</Statistic.Label>
        </Statistic>
      </Flexbox>
    )
  }
}

PlantStatistics.propTypes = {
  plantstatistics : React.PropTypes.array,
};
