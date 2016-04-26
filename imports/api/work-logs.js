import { Mongo } from 'meteor/mongo';

export const WorkLogs = new Mongo.Collection('work_logs');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('work-logs', function() {
    if (this.userId) {
      return WorkLogs.find();
    }
    return [];
  });
}

WorkLogs.allow({
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
