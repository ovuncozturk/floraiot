import React, { Component, PropTypes } from 'react';
import Flexbox from 'flexbox-react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Rating } from 'semantic-ui-react';
import { List } from 'semantic-ui-react'


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

export default class PlantIdentity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: null,
      clicked: null,
    };
  }

  render() {
    return (
        <Flexbox flexDirection='column' justifyContent='flex-start' alignItems='flex-start'>
          <Card>
            <Image src='plant1.jpeg' />
            <Card.Content>
              <Card.Header>
                Areca Palm
              </Card.Header>
              <Card.Meta>
                <span className='date'>
                  Living Room
                </span>
              </Card.Meta>
              <Card.Description>
                Also known as yellow-palm or butterfly palm.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <List>
               <List.Item>
                 <List.Icon name='settings' />
                 <List.Content>Health <Rating icon='star' disabled={true} rating={4}  maxRating={5} /></List.Content>

               </List.Item>
               <List.Item>
                 <List.Icon name='heart' />
                 <List.Content>New York, NY</List.Content>
               </List.Item>
               <List.Item>
                 <List.Icon name='mail' />
                 <List.Content>
                   <a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>
                 </List.Content>
               </List.Item>
               <List.Item>
                 <List.Icon name='linkify' />
                 <List.Content>
                   <a href='http://www.semantic-ui.com'>semantic-ui.com</a>
                 </List.Content>
               </List.Item>
             </List>

            </Card.Content>
          </Card>
        </Flexbox>
    )
  }
}

PlantIdentity.propTypes = {
  plantidentity : React.PropTypes.array,
};
