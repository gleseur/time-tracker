import { Template } from 'meteor/templating';
import { WorkLogs } from '../api/work-logs.js';


import './body.html';

Template.logWork.events({
  'submit .new-log'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const $target = $(event.target);

    const $project = $target.find('input[name=project]');
    const $client = $target.find('input[name=client]');
    const $reason = $target.find('input[name=reason]');
    const $minutes = $target.find('input[name=minutes]');


    // Insert a task into the collection
    WorkLogs.insert({
      user: Meteor.user().profile.name,
      project: $project.val(),
      client: $project.val(),
      reason: $reason.val(),
      minutes: parseInt($minutes.val()),
      createdAt: new Date(), // current time
    });
  }
});
