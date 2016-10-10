import { menuItems } from './fooditem';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '../../modules/rate-limit.js';

export const insertmenuItem = new ValidatedMethod({
  name: 'menuItems.insert',
  validate: new SimpleSchema({
    title: { type: String },
    price: { type: Number },
  }).validator(),
  run(menuItem) {
    menuItems.insert(menuItem);
  },
});

export const updatemenuItem = new ValidatedMethod({
  name: 'menuItems.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.title': { type: String, optional: true },
    'update.price': { type: Number, optional: true },
  }).validator(),
  run({ _id, update }) {
    menuItems.update(_id, { $set: update });
  },
});

export const removemenuItem = new ValidatedMethod({
  name: 'menuItems.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    menuItems.remove(_id);
  },
});

rateLimit({
  methods: [
    insertmenuItem,
    updatemenuItem,
    removemenuItem,
  ],
  limit: 5,
  timeRange: 1000,
});
