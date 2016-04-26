import { Template } from 'meteor/templating';
import { WorkLogs } from '../api/work-logs.js';
import { Projects } from '../api/projects.js';
import { Clients } from '../api/clients.js';
import { Reasons } from '../api/reasons.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './body.html';

Template.logWork.onCreated(function() {
  Meteor.subscribe('clients');
  Meteor.subscribe('reasons');
  Meteor.subscribe('projects');
  Meteor.subscribe('work-logs');
  this.newLogWorkState = new ReactiveDict();
});

Template.logWork.events({
  'change .project'(event, instance) {
    instance.newLogWorkState.set('project',  $(event.target).val());
  },
  'change .client'(event, instance) {
    instance.newLogWorkState.set('client',  $(event.target).val());
  },
  'change .reason'(event, instance) {
    instance.newLogWorkState.set('reason',  $(event.target).val());
  },
  'change .minutes'(event, instance) {
    instance.newLogWorkState.set('minutes',  $(event.target).val());
  },
  'submit .new-log'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();

    let minutes = parseInt(instance.newLogWorkState.get('minutes'));
    if (isNaN(minutes)) {
      return;
    }

    // Insert a task into the collection
    WorkLogs.insert({
      user: Meteor.user().profile.name,
      project: instance.newLogWorkState.get('project'),
      client: instance.newLogWorkState.get('client'),
      reason: instance.newLogWorkState.get('reason'),
      minutes: minutes,
      createdAt: new Date(), // current time
    });
  }
});

Template.projects.helpers({
  projects: function() {
    return Projects.find();
  },
});

Template.clients.helpers({
  clients: function() {
    return Clients.find();
  },
});

Template.reasons.helpers({
  reasons: function() {
    return Reasons.find();
  },
});

Template.workLogs.helpers({
  workLogs: function() {
    return WorkLogs.find({}, {sort: {createdAt: -1}});
  },
});
