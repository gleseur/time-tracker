import { Projects } from '../imports/api/projects';
import { Reasons } from '../imports/api/reasons';
import { Clients } from '../imports/api/clients';

function seedCollection(collection, values){
  for(let value of values){
    seedValue( collection, value );
  };
};

function seedValue(collection, value){
  const ele = collection.findOne(value);
  if (ele === undefined) {
    console.log('seeding', collection, value);
    collection.insert(value);
  }

};

function seed(){
  seedCollection(Projects, [
                 {name: 'pro1'},
                 {name: 'pro2'},
  ]);

  seedCollection(Reasons, [
                 {name: 'reason_one'},
                 {name: 'no reason'},
  ]);

  seedCollection(Clients, [
                 {name: 'TTX'},
                 {name: 'XTT'},
  ]);
}

if (Meteor.isServer) {
  Meteor.startup(seed);
}

