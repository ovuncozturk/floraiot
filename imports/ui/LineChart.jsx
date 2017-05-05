import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//import addConstraint from '../redux/actions/addConstraint';

import Flexbox from 'flexbox-react';

import * as V from 'victory';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';

class LineChartComponent extends React.Component {



  constructor(props) {
    super(props);
    this.state = {value: ""};
    // this.handleChange = this.handleChange.bind(this);
    // this.addConstraint = this.addConstraint.bind(this);
  }

  // addConstraint(event) {
  //   console.log("Kısıt");
  //   console.log(this.props.propertyName);
  //   console.log(this.state.value);
  //   this.props.dispatch(addConstraint('ObjectProperty',this.props.propertyName,this.state.value,''));
  // }
  //
  // handleChange(event, index, value) {
  //   this.setState({value: value});
  // };
  //
  // renderMenuItem(data) {
  //   return (
  //     <MenuItem
  //       key={data._id}
  //       value={data.uri}
  //       primaryText={data.localname}
  //     >
  //     </MenuItem>
  //   )
  // }
  //
  // printMenuItem(data) {
  //   console.log(data.label);
  // }

  render() {
    const styles = this.getStyles();

    return (
      <Flexbox>
        <VictoryChart>
          <VictoryLabel x={25} y={24} style={styles.title}
            text={s.capitalize(this.props.sensorname) }
          />
          <VictoryLine
            data={this.props.plantmonitor.reverse()}
            scale={{x: "time", y: "linear"}}
            x = { (datum) => datum.date}
            y = {this.props.sensorname}
            standalone={false}
            />
          <VictoryLine
            data={this.props.plantmonitor.reverse()}
            scale={{x: "time", y: "linear"}}
            x = { (datum) => datum.date}
            y = { (datum) => this.props.lowerlimit }
            standalone={false}
            />
          <VictoryLine
            data={this.props.plantmonitor.reverse()}
            scale={{x: "time", y: "linear"}}
            x = { (datum) => datum.date}
            y = { (datum) => this.props.upperlimit }
            standalone={false}
            />
          <VictoryAxis
            scale="time"
            standalone={false}
            tickFormat={
              (x) => {
                return ;
              }
            }
            />
        </VictoryChart>
      </Flexbox>
    );
  }

  getStyles() {
    const BLUE_COLOR = "#00a3de";
    const RED_COLOR = "#7c270b";

    return {
      parent: {
        background: "#ccdee8",
        boxSizing: "border-box",
        display: "inline",
        padding: 0,
        margin: 20,
        fontFamily: "'Fira Sans', sans-serif",
        width: "100%",
        height: "auto"
      },
      title: {
        textAnchor: "start",
        verticalAnchor: "end",
        fill: "#000000",
        fontFamily: "inherit",
        fontSize: "18px",
        fontWeight: "bold"
      },
      labelNumber: {
        textAnchor: "middle",
        fill: "#ffffff",
        fontFamily: "inherit",
        fontSize: "14px"
      },

      // INDEPENDENT AXIS
      axisYears: {
        axis: { stroke: "black", strokeWidth: 1},
        ticks: {
          size: (tick) => {
            const tickSize =
              tick.getFullYear() % 5 === 0 ? 10 : 5;
            return tickSize;
          },
          stroke: "black",
          strokeWidth: 1
        },
        tickLabels: {
          fill: "black",
          fontFamily: "inherit",
          fontSize: 16
        }
      },

      // DATA SET ONE
      axisOne: {
        grid: {
          stroke: (tick) =>
            tick === -10 ? "transparent" : "#ffffff",
          strokeWidth: 2
        },
        axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
        ticks: { strokeWidth: 0 },
        tickLabels: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontSize: 16
        }
      },
      labelOne: {
        fill: BLUE_COLOR,
        fontFamily: "inherit",
        fontSize: 12,
        fontStyle: "italic"
      },
      lineOne: {
        data: { stroke: BLUE_COLOR, strokeWidth: 4.5 }
      },
      axisOneCustomLabel: {
        fill: BLUE_COLOR,
        fontFamily: "inherit",
        fontWeight: 300,
        fontSize: 21
      },

      // DATA SET TWO
      axisTwo: {
        axis: { stroke: RED_COLOR, strokeWidth: 0 },
        tickLabels: {
          fill: RED_COLOR,
          fontFamily: "inherit",
          fontSize: 16
        }
      },
      labelTwo: {
        textAnchor: "end",
        fill: RED_COLOR,
        fontFamily: "inherit",
        fontSize: 12,
        fontStyle: "italic"
      },
      lineTwo: {
        data: { stroke: RED_COLOR, strokeWidth: 4.5 }
      },

      // HORIZONTAL LINE
      lineThree: {
        data: { stroke: "#e95f46", strokeWidth: 2 }
      }
    };
  }
}

LineChartComponent.propTypes = {
  plantmonitor  : React.PropTypes.array,
  sensorname    : React.PropTypes.string,
  upperlimit    : React.PropTypes.number,
  lowerlimit    : React.PropTypes.number,
  name          : React.PropTypes.string,
};

export default connect()(LineChartComponent);
