import { Meteor } from 'meteor/meteor';
import moment from 'moment';

const SensorReadings = new Mongo.Collection('sensorreadings');
export const PlantMonitor = new Mongo.Collection('plantmonitor');
export const PlantStatistics = new Mongo.Collection('plantstatistics');
export const Plants = new Mongo.Collection('plants');
export const SystemStatistics = new Mongo.Collection('systemstatistics');
export const PlantInfo = new Mongo.Collection('plantinfo');
export const PlantHealth = new Mongo.Collection('planthealth');

if (Meteor.isServer) {
  console.log("Starting Sensor Readings");

  // 194.27.50.11:3000
  // 192.168.1.103:3000
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

      PlantObserver(monitorEntry);
      //let plantinfo = Plants.findOne({'machineid': monitorEntry['id']}, {_id: 1}).plantinfo;
      //let email = Meteor.users.findOne({'_id': Plants.findOne({'machineid': monitorEntry['id']}, {_id: 1}).owner}, {_id: 1}).emails[0].address;

      //console.log(boundaries);
      //console.log(email);

      // if (boundaries.temperature_requirements.daytime.min > monitorEntry.temperature)
      //   Meteor.call('sendAlertToOwner', 'water alert', email);
      // else if (boundaries.temperature_requirements.daytime.max < monitorEntry.temperature)
      //   Meteor.call('sendAlertToOwner', 'temperature too high!', email);
      //console.log(findAverages(monitorEntry['id'],1,'hours'));
      //console.log(findAverages(monitorEntry['id'],1,'days'));
      //console.log(findAverages(monitorEntry['id'],1,'weeks'));
    });

    let updatePlantHealthForPeriod = function(machineId,start, end, duration, temperatureHealthPoint, humidityHealthPoint, luminosityHealthPoint) {
      plantHealth = PlantHealth.findOne({ id: machineId, start: start, end: end},
                         { }, {});


      if (plantHealth)
      {
        PlantHealth.update({ id: machineId, start: start, end: end},
                           {
                                id: machineId, start: start, end: end, duration: duration,
                                temperatureHealthPoint : plantHealth.temperatureHealthPoint + temperatureHealthPoint,
                                humidityHealthPoint : plantHealth.humidityHealthPoint + humidityHealthPoint,
                                luminosityHealthPoint : plantHealth.luminosityHealthPoint + luminosityHealthPoint,
                                countOfPoints : plantHealth.countOfPoints + 1,
                           }, { upsert : true});

      }
      else {
        PlantHealth.update({ id: machineId, start: start, end: end},
                           {
                                id: machineId, start: start, end: end, duration: duration,
                                temperatureHealthPoint : temperatureHealthPoint,
                                humidityHealthPoint : humidityHealthPoint,
                                luminosityHealthPoint : luminosityHealthPoint,
                                countOfPoints : 1,
                           }, { upsert : true});
      }
    };

    temperatureCoefficient  = 0.25;
    //airhumidityCoefficient  = 0.25;
    soilhumidityCoefficient = 0.50;
    luminosityCoefficient   = 0.25

    let PlantObserver = function(monitorEntry) {
      let plantinfo = Plants.findOne({'machineid': monitorEntry['id']}, {_id: 1}).plantinfo;

      // For a hourly period
      normalizedStartDate = moment(monitorEntry.Date).startOf('hour').toDate();
      normalizedEndDate = moment(monitorEntry.Date).endOf('hour').toDate();
      console.log(normalizedStartDate);
      console.log(normalizedEndDate);

      updatePlantHealthForPeriod(monitorEntry['id'], normalizedStartDate, normalizedEndDate, 'hour',
                                (plantinfo.ideal_conditions.temp.daytime.min > monitorEntry.temperature || plantinfo.ideal_conditions.temp.daytime.max < monitorEntry.temperature) ? -1 : 1,
                                (plantinfo.ideal_conditions.soil_moisture.min > monitorEntry.humidity || plantinfo.ideal_conditions.soil_moisture.max < monitorEntry.humidity) ? -1 : 1,
                                (plantinfo.ideal_conditions.light.min > monitorEntry.luminosity || plantinfo.ideal_conditions.light.max < monitorEntry.luminosity) ? -1 : 1
      );

      // For a daily period
      normalizedStartDate = moment(monitorEntry.Date).startOf('day').toDate();
      normalizedEndDate = moment(monitorEntry.Date).endOf('day').toDate();
      console.log(normalizedStartDate);
      console.log(normalizedEndDate);

      updatePlantHealthForPeriod(monitorEntry['id'], normalizedStartDate, normalizedEndDate, 'day',
                                (plantinfo.ideal_conditions.temp.daytime.min > monitorEntry.temperature || plantinfo.ideal_conditions.temp.daytime.max < monitorEntry.temperature) ? -1 : 1,
                                (plantinfo.ideal_conditions.soil_moisture.min > monitorEntry.humidity || plantinfo.ideal_conditions.soil_moisture.max < monitorEntry.humidity) ? -1 : 1,
                                (plantinfo.ideal_conditions.light.min > monitorEntry.luminosity || plantinfo.ideal_conditions.light.max < monitorEntry.luminosity) ? -1 : 1
      );
    };
      //
      // Meteor.publish('plantmonitor', function(){
      //   return PlantMonitor.find({},{sort: {date : -1}, limit: 300});
      // });

      Meteor.publish('plantmonitor.machine', function(machineId,readingCount){
        return PlantMonitor.find({id: machineId},{sort: {date : -1}, limit: readingCount});
      });

      Meteor.publish('plantstatistics', function( machineid ) {
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

      Meteor.publish('plantinfo', function(){
        return PlantInfo.find({});
      });

      Meteor.publish('planthealth', function( machineid, start, duration ) {
        return PlantHealth.find({ id: machineid, start: start, duration: duration });
      });
}
