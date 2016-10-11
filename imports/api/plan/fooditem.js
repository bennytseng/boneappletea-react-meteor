import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const menuItems = new Mongo.Collection('menuItems');

menuItems.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

menuItems.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

menuItems.schema = new SimpleSchema({
  title: {
    type: String,
    label: 'Menu Item',
  },
  price: {
    type: Number,
    label: 'Price of Menu Item'
  }
});

menuItems.attachSchema(menuItems.schema);

Factory.define('menu', menuItems, {
  title: () => faker.hacker.phrase(),
  price: () => Math.floor(Math.random()*(19-11)+10)
});
