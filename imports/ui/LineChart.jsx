import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Flexbox from 'flexbox-react';

import * as V from 'victory';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';

import R from 'ramda';

class LineChartComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ""};
  }


  render() {
    let threshold = (this.props.upperlimit - this.props.lowerlimit) * 0.1;
    let domain = [this.props.lowerlimit - threshold, this.props.upperlimit + threshold ];
    let dashArray = [8,4];
    const styles = this.getStyles();

    console.log( R.map( x => new Date(x) , R.uniq(R.map(x => x.date.setSeconds(0,0), R.filter( x => x.date.getMinutes() % 10 === 0 ,this.props.plantmonitor.reverse())))));

    return (
        <VictoryChart width={800} height={300} >
          <VictoryLabel x={25} y={24} style={styles.title}
            text={s.capitalize(this.props.sensorname) }
          />
          <VictoryAxis dependentAxis
            scale="linear"
            standalone={false}
            tickFormat={
              (y) => {
                return y;
              }
            }
            domain = {domain}
            style = { styles.axisOne}
          />
          <VictoryLine
            data={this.props.plantmonitor.reverse()}
            scale={{x: "time", y: "linear"}}
            x = { (datum) => datum.date}
            y = {this.props.sensorname}
            domain = {{ y : domain}}
            standalone={false}
            />
          <VictoryLine
            data={this.props.plantmonitor.reverse()}
            scale={{x: "time", y: "linear"}}
            x = { (datum) => datum.date}
            y = { (datum) => this.props.lowerlimit }
            domain = {{ y : domain}}
            standalone={false}
            style={{ data: { stroke: 'red', strokeDasharray: dashArray } }}
            />
          <VictoryLine
            data={this.props.plantmonitor.reverse()}
            scale={{x: "time", y: "linear"}}
            x = { (datum) => datum.date}
            y = { (datum) => this.props.upperlimit }
            domain = {{ y : domain}}
            standalone={false}
            style={{ data: { stroke: 'red', strokeDasharray: dashArray } }}
            />
          <VictoryAxis
            scale="time"
            standalone={false}
            tickValues={R.map( x => new Date(x) , R.uniq(R.map(x => x.date.setSeconds(0,0), R.filter( x => x.date.getMinutes() % 10 === 0 ,this.props.plantmonitor.reverse()))))}
            tickFormat={
              (x) => {
                return x.getHours() + ':' + (x.getMinutes() == 0 ? '00' : x.getMinutes());
              }
            }
          />

        </VictoryChart>
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
        fontFamily: "fira",
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
            tick === -10 ? "transparent" : BLUE_COLOR,
          strokeWidth: 0.2
        },
        axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
        ticks: { strokeWidth: 0 },
        tickLabels: {
          fill: BLUE_COLOR,
          fontFamily: "fira",
          fontSize: 12
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
