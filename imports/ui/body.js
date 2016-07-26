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
});

Template.logWork.events({
  'submit .new-log'(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();

    const project = $('select.project').val();
    const client = $('select.client').val();
    const reason = $('select.reason').val();
    const minutes = parseInt($('input[name=minutes]').val());
    if (isNaN(minutes)) {
      return;
    }

    // Insert a task into the collection
    WorkLogs.insert({
      user: Meteor.user().profile.name,
      project: project,
      client: client,
      reason: reason,
      minutes: minutes,
      createdAt: new Date(), // current time
    });

    $(event.target).find('input[name=minutes]').val('');
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
