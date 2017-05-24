import React, { Component, PropTypes } from 'react';
import Flexbox from 'flexbox-react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Rating } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import SunCalc from 'suncalc';


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
    let idcard, plantname, typename, latinname, times;
    let now = Date();

    if (this.props.plantidentity.length == 1) {
      idcard = this.props.plantidentity[0];
      plantname = idcard.name;
      typename = idcard.plantinfo.name;
      description = idcard.plantinfo.desc;
      latinname = idcard.plantinfo.latinname;
      times = SunCalc.getTimes(new Date(), idcard.location.lati, idcard.location.long);
      sunsettime = times.sunset.toString() + " " + now.toString();
    }
    else {
      idcard = "";
      plantname = "";
      typename = "";
      description = "";
      latinname = "";
      sunsettime = "";
    }
    return (
        <Flexbox flexDirection='column' justifyContent='flex-start' alignItems='flex-start'>
          <Card>
            <Image src= {'http://localhost:3000/' + typename + '.jpg'} />
            <Card.Content>
              <Card.Header>
                {plantname}
              </Card.Header>
              <Card.Meta>
                <span className='date'>
                  {latinname}
                </span>
              </Card.Meta>
              <Card.Description>
                {description}
                {sunsettime}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              
            </Card.Content>
          </Card>
        </Flexbox>
    )
  }
}

PlantIdentity.propTypes = {
  plantidentity : React.PropTypes.array,
};
