import { Mongo } from 'meteor/mongo';

export const Projects = new Mongo.Collection('projects');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('projects', function() {
    if (this.userId) {
      return Projects.find();
    }
    return [];
  });
}

Projects.allow({
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
