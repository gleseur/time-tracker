import { Mongo } from 'meteor/mongo';

export const Reasons = new Mongo.Collection('reasons');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('reasons', function() {
    if (this.userId) {
      return Reasons.find();
    }
    return [];
  });
}

Reasons.allow({
  insert: function (userId, doc) {
    // the user must be logged in
    return userId;
  },
  update: function (userId, doc, fields, modifier) {
    return false;
  },
  remove: function (userId, doc) {
    return false
  },
});
