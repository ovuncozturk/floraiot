import React, { Component, PropTypes } from 'react';
//import LineChartComponent from './LineChartComponent.jsx';

import * as V from 'victory';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryPie } from 'victory';

import { Icon, Image, List } from 'semantic-ui-react'

import LineChartComponent from './LineChart.jsx';

import Flexbox from 'flexbox-react';
import moment from 'moment';


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
      <List>
        <List.Item>
          <List.Icon name='thermometer half' size='huge' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'>Temperature</List.Header>
            <List.Description as='a'>{temperature}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='theme' size='huge' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'>Humidity</List.Header>
            <List.Description as='a'>{humidity}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='sun' size='huge' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'>Luminosity</List.Header>
            <List.Description as='a'>{luminosity}</List.Description>
          </List.Content>
        </List.Item>
      </List>
    )
  }
}

PlantStatistics.propTypes = {
  plantstatistics : React.PropTypes.array,
};
