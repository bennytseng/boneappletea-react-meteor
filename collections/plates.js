Plates = new Mongo.Collection('plates');

Plates.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Plates.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let PlatesSchema = new SimpleSchema({
  'name': {
    type: String,
    label: 'Name of the Plate (Channel).'
  }
});

Plates.attachSchema( PlatesSchema );
