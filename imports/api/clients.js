import { Mongo } from 'meteor/mongo';

export const Clients = new Mongo.Collection('clients');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('clients', function() {
    if (this.userId) {
      return Clients.find();
    }
    return [];
  });
}

Clients.allow({
  insert: function (userId, doc) {
    // the user must be logged in
    return userId && Meteor.users.findOne({ _id: userId }).profile.admin;
  },
  update: function (userId, doc, fields, modifier) {
    return false;
  },
  remove: function (userId, doc) {
    return false
  },
});
