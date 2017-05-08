import { Meteor } from 'meteor/meteor';
import moment from 'moment';

const SensorReadings = new Mongo.Collection('sensorreadings');
export const PlantMonitor = new Mongo.Collection('plantmonitor');
export const PlantStatistics = new Mongo.Collection('plantstatistics');

if (Meteor.isServer) {
  console.log("Starting Sensor Readings");

  SensorReadings.mqttConnect("mqtt://194.27.50.11:3000", ["/flora","#"], {
    insert: true,
    raw: true
  });



  SensorReadings.after.insert(function(userId,doc) {
    let data = Papa.parse(doc.message,{delimeter:',',newline:'\n'});
    console.log("New value added");

    _.each(data.data,function(item) {
      let date = moment();

      let sensorValue = {
        date        : date.toDate(),
        id          : item[0],
        temperature : parseFloat(item[1]),
        humidity    : parseInt(item[2])/1024*100,
        luminosity  : parseFloat(item[3])};

      console.log(sensorValue);
      PlantMonitor.insert(sensorValue);
      });
    });

    let findAverages = function(machineId, timespan, timeunit) {
      let plantMonitorLastHour = PlantMonitor.find({id: machineId, date: {$gte : moment().subtract( parseInt(timespan), timeunit).toDate() }}).fetch();
      let countOfRecords = plantMonitorLastHour.length;
      let totals = _.reduce(plantMonitorLastHour, function(memo, reading) {
          //console.log(":");
          //console.log(reading);
          return {'temperature' : reading['temperature']  +   memo['temperature'],
            'humidity'    : reading['humidity']     +   memo['humidity'],
            'luminosity'  : reading['luminosity']   +   memo['luminosity']};
          }
        );

      return {machineId: machineId, 'temperature' : totals['temperature']/countOfRecords,'humidity' : totals['humidity']/countOfRecords,'luminosity'  : totals['luminosity']/countOfRecords}
    };

    PlantMonitor.after.insert(function(userId,monitorEntry) {
      let averages = findAverages(monitorEntry['id'],1,'hours');

      PlantStatistics.update({ id: monitorEntry['id'], timespan: 1, timeunit: 'hours'},
                             { id: monitorEntry['id'], timespan: 1, timeunit: 'hours',
                                temperature: averages['temperature'], humidity: averages['humidity'], luminosity: averages['luminosity'] }, {upsert: true});

      //console.log(findAverages(monitorEntry['id'],1,'hours'));
      //console.log(findAverages(monitorEntry['id'],1,'days'));
      //console.log(findAverages(monitorEntry['id'],1,'weeks'));
    });
      //
      // Meteor.publish('sensorreadings', function(){
      //   return SensorReadings.find({}).fetch();
      // });
      Meteor.publish('plantmonitor', function(){
        return PlantMonitor.find({},{sort: {date : -1}, limit: 300});
      });

      Meteor.publish('plantmonitor.machine', function(machineId){
        new SimpleSchema({
          machineId: {type: String}
        }).validate({ machineId });
        return PlantMonitor.find({id: machineId},{sort: {date : -1}, limit: 300});
      });

      Meteor.publish('plantstatistics', function() {
        return PlantStatistics.find({id: 'ESP8266-1478318', timespan: 1, timeunit: 'hours'});
      });
}
