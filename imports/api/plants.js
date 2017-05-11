import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export const Plants = new Mongo.Collection('plants');

if (Meteor.isServer) {
  console.log("Starting Plants");

  Meteor.publish('plants', function(){
    return Plants.find({ },{});
  });

  Meteor.publish('plants.type', function(typeName){
    new SimpleSchema({
      typeName: {type: String}
    }).validate({ typeName });

    return Plants.find({ owner : this.userId, type: typeName},{});
  });
}
