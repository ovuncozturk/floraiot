import React, { Component, PropTypes } from 'react';
//import LineChartComponent from './LineChartComponent.jsx';

import * as V from 'victory';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryPie } from 'victory';

import { List, Rating} from 'semantic-ui-react'

import LineChartComponent from './LineChart.jsx';

import Flexbox from 'flexbox-react';

import '../stylesheets/semantic.min.css'

export default class PlantHealth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: null,
      clicked: null,
    };
  }

  render() {
    let temperatureHealthPoint,humidityHealthPoint,luminosityHealthPoint;

    if (this.props.planthealth.length == 1) {
      console.log(this.props.planthealth[0].temperatureHealthPoint);
      temperatureHealthPoint = this.props.planthealth[0].temperatureHealthPoint/this.props.planthealth[0].countOfPoints*5;
      humidityHealthPoint    = this.props.planthealth[0].humidityHealthPoint/this.props.planthealth[0].countOfPoints*5;
      luminosityHealthPoint  = this.props.planthealth[0].luminosityHealthPoint/this.props.planthealth[0].countOfPoints*5;
    }
    else {
      temperatureHealthPoint = 0;
      humidityHealthPoint    = 0;
      luminosityHealthPoint  = 0;
    }

    return (
      <List>
       <List.Item>
         <List.Content floated='left'>Temperature Health </List.Content>
         <List.Content floated='right'><Rating icon='heart' disabled={true} rating={temperatureHealthPoint}  maxRating={5} /> </List.Content>
       </List.Item>
       <List.Item>
         <List.Content floated='left'>Humidity Health </List.Content>
         <List.Content floated='right'><Rating icon='heart' disabled={true} rating={humidityHealthPoint}  maxRating={5} /> </List.Content>
       </List.Item>
       <List.Item>
         <List.Content floated='left'>Luminosity Health </List.Content>
         <List.Content floated='right'><Rating icon='heart' disabled={true} rating={luminosityHealthPoint}  maxRating={5} /> </List.Content>
       </List.Item>
     </List>
    )
  }
}

PlantHealth.propTypes = {
  planthealth : React.PropTypes.array,
};
