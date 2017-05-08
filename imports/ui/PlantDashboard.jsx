import React, { Component, PropTypes } from 'react';
//import LineChartComponent from './LineChartComponent.jsx';

import * as V from 'victory';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';

import { Button, Icon, Image, Statistic, Card } from 'semantic-ui-react'

import LineChartComponent from './LineChart.jsx';

import converter from 'number-to-words';

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

export default class PlantDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: null,
      clicked: null,
    };
  }

  renderAllPlants()
  {
    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src='/assets/images/avatar/large/steve.jpg' />
          <Card.Header>
            Steve Sanders
          </Card.Header>
          <Card.Meta>
            Friends of Elliot
          </Card.Meta>
          <Card.Description>
            Steve wants to add you to the group <strong>best friends</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>Approve</Button>
          <Button basic color='red'>Decline</Button>
        </div>
      </Card.Content>
    </Card>
  );
}

  render() {
    return (
        <Flexbox flexDirection='column'>
          <Flexbox flexDirection='row'>
          <Statistic.Group widths='four'>
            <Statistic>
              <Statistic.Value>{converter.toWords(this.props.plantcount)}</Statistic.Value>
              <Statistic.Label>{ this.props.plantcount === 1 ? 'Plant' : 'Plants' }</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value text>
                {converter.toWords(this.props.plantcount)}
                <br />Thousand
                </Statistic.Value>
                <Statistic.Label>Sensor Readings</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Flexbox>
          <Flexbox flexDirection='row'>
            <Card.Group>
              {this.renderAllPlants()}
            </Card.Group>
          </Flexbox>
        </Flexbox>
    )
  }
}

PlantDashboard.propTypes = {
  plants : React.PropTypes.array,
  plantswithtype : React.PropTypes.array,
  plantcount : React.PropTypes.number,
};
