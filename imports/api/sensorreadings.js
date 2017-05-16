import { Meteor } from 'meteor/meteor';
import moment from 'moment';

const SensorReadings = new Mongo.Collection('sensorreadings');
export const PlantMonitor = new Mongo.Collection('plantmonitor');
export const PlantStatistics = new Mongo.Collection('plantstatistics');
export const Plants = new Mongo.Collection('plants');
export const SystemStatistics = new Mongo.Collection('systemstatistics');

if (Meteor.isServer) {
  console.log("Starting Sensor Readings");

  // 194.27.50.11:3000
  // 192.168.1.103:3000
  SensorReadings.mqttConnect("mqtt://192.168.1.103:3000", ["/flora","#"], {
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
      SystemStatistics.update({ id: 'floraiot'  },{ id: 'floraiot', sensorreadingcount : SensorReadings.find({}).count() }, {upsert: true});
      console.log(SensorReadings.find({}).count());
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

      Meteor.publish('plantmonitor.machine', function(machineId,readingCount){
        return PlantMonitor.find({id: machineId},{sort: {date : -1}, limit: readingCount});
      });

      Meteor.publish('plantstatistics', function( machineid ) {
        console.log("Publishing statistics : " + machineid);
        console.log(PlantStatistics.find({ id: machineid, timespan: 1, timeunit: 'hours'}).fetch());
        return PlantStatistics.find({ id: machineid, timespan: 1, timeunit: 'hours'});
      });

      console.log("Starting Plants");

      Meteor.publish('plants', function(){
        return Plants.find({ },{});
      });

      Meteor.publish('plantidentity', function(machineid){
        return Plants.find({ owner : this.userId, machineid : machineid},{});
      });

      console.log("Starting System Statistics");

      Meteor.publish('systemstatistics', function(machineid){
        return SystemStatistics.find({});
      });
}
