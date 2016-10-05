Bites = new Mongo.Collection('bites');

Bites.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Bites.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let BitesSchema = new SimpleSchema({
  'plates': {
    type: String,
    label: 'ID of the Plate(Channel) this Bite(message) belongs to.',
    optional: true
  },
  'to': {
    type: String,
    label: 'ID of the user this bite was sent directly to (private message)',
    optional: true
  },
  'owner': {
    type: String,
    label: 'ID of the user that created this bite.'
  },
  'timestamp': {
    type: Date,
    label: 'date and time the bite was created'
  },
  'bite': {
    type: String,
    label: 'Content of the bite(message)'
  }
});

Bites.attachSchema( BitesSchema );
