import React, { Component, PropTypes } from 'react';
//import LineChartComponent from './LineChartComponent.jsx';

import * as V from 'victory';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';

import { Button, Icon, Image, Statistic, Card, List, Rating } from 'semantic-ui-react'
import { push, replace, go, goBack, goForward, RouterProvider, Link } from 'redux-little-router';
import { Provider, connect } from 'react-redux';

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

class PlantDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: null,
      clicked: null,
    };
  }

  renderAllPlants(item)
  {
    console.log(item);
    return (
      <Card key={item._id}>
        <Card.Content>
          <Image floated='right' size='mini' src={ 'http://localhost:3000/' + item.plantinfo.name + '.jpg'} />
          <Card.Header>
            {item.name}
          </Card.Header>
          <Card.Meta>
            {item.plantinfo.latinname}
          </Card.Meta>
          <Card.Description>
            <List>
             <List.Item>
               <List.Content>Overall Rating <Rating icon='star' disabled={true} rating={item.plantinfo.overall_rating}  maxRating={10} /></List.Content>
             </List.Item>
             <List.Item>
               <List.Content>Removal of Chemical Vapors <Rating icon='star' disabled={true} rating={item.plantinfo.removal_of_chemical_vapors}  maxRating={10} /></List.Content>
             </List.Item>
           </List>
          </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link className='ui two buttons' href={'/monitor/'+ item.machineid }>
          <Button basic color='green'>Details</Button>
        </Link>
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
              <Statistic.Value>{ converter.toWords(this.props.plantcount) }</Statistic.Value>
              <Statistic.Label>{ this.props.plantcount === 1 ? 'Plant' : 'Plants' }</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value text>
                { converter.toWords(this.props.plantcount) }
                <br />Thousand
                </Statistic.Value>
                <Statistic.Label>Sensor Readings</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Flexbox>
          <Flexbox flexDirection='row'>
            <Card.Group>
              {this.props.plants.map(this.renderAllPlants,this)}
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

export default connect() (PlantDashboard);
