import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export const PlantStatistics = new Mongo.Collection('plantstatistics');

if (Meteor.isServer) {
  console.log("Starting Plant Statistics");

      Meteor.publish('plantstatistics', function() {
        return PlantStatistics.find({id: 'ESP8266-1478318', timespan: 1, timeunit: 'hours'});
      });
}
