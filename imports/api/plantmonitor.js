import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export const PlantMonitor = new Mongo.Collection('plantmonitor');

if (Meteor.isServer) {
  console.log("Starting Plant Monitor");

    PlantMonitor.after.insert(function(userId,monitorEntry) {
      let averages = findAverages(monitorEntry['id'],1,'hours');

      PlantStatistics.update({ id: monitorEntry['id'], timespan: 1, timeunit: 'hours'},
                             { id: monitorEntry['id'], timespan: 1, timeunit: 'hours',
                                temperature: averages['temperature'], humidity: averages['humidity'], luminosity: averages['luminosity'] }, {upsert: true});
    });

      Meteor.publish('plantmonitor', function(){
        return PlantMonitor.find({});
      });
}
