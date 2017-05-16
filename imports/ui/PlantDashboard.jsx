import React, { Component, PropTypes } from 'react';
//import LineChartComponent from './LineChartComponent.jsx';

import * as V from 'victory';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';

import { Button, Icon, Image, Statistic, Card, List, Rating, Divider, Dimmer, Loader, Accordion } from 'semantic-ui-react'
import { push, replace, go, goBack, goForward, RouterProvider, Link } from 'redux-little-router';
import { Provider, connect } from 'react-redux';

import LineChartComponent from './LineChart.jsx';

import converter from 'number-to-words';

import Flexbox from 'flexbox-react';
import moment from 'moment';


class PlantDashboard extends React.Component {
  constructor(props) {
    super(props);
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
            <Accordion>
              <Accordion.Title>
                <Icon name='dropdown' />
                Plant Ratings
              </Accordion.Title>
              <Accordion.Content>
                <List>
                 <List.Item>
                   <List.Content>Overall Rating <Rating icon='star' disabled={true} rating={item.plantinfo.overall_rating}  maxRating={10} /></List.Content>
                 </List.Item>
                 <List.Item>
                   <List.Content>Removal of Chemical Vapors <Rating icon='star' disabled={true} rating={item.plantinfo.removal_of_chemical_vapors}  maxRating={10} /></List.Content>
                 </List.Item>
                 <List.Item>
                   <List.Content>Ease of Growth and Maintenance <Rating icon='star' disabled={true} rating={item.plantinfo.ease_of_growth_and_maintenance}  maxRating={10} /></List.Content>
                 </List.Item>
                 <List.Item>
                   <List.Content>Resistance to insect infestation <Rating icon='star' disabled={true} rating={item.plantinfo.resistance_to_insect_infestation}  maxRating={10} /></List.Content>
                 </List.Item>
                 <List.Item>
                   <List.Content>Transpiration rate <Rating icon='star' disabled={true} rating={item.plantinfo.transpiration_rate}  maxRating={10} /></List.Content>
                 </List.Item>
               </List>

              </Accordion.Content>
            </Accordion>
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
    if (this.props.systemstatistics.length != 1) {
      return (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      )
    }

    return (
      <Flexbox flexDirection='column'>
        <Flexbox flexDirection='row' justifyContent='center'>
          <Statistic.Group >
            <Statistic>
              <Statistic.Value>{ converter.toWords(this.props.plantcount) }</Statistic.Value>
              <Statistic.Label>{ this.props.plantcount === 1 ? 'Plant' : 'Plants' }</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value text>
                { converter.toWords(this.props.systemstatistics[0].sensorreadingcount) }
                </Statistic.Value>
                <Statistic.Label>Sensor Readings</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Flexbox>
          <Divider horizontal> Plant List </Divider>
          <Flexbox flexDirection='row' justifyContent='center'>
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
  systemstatistics : React.PropTypes.array,
};

export default connect() (PlantDashboard);
