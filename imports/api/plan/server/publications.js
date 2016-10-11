import { Meteor } from 'meteor/meteor';
import { menuItems } from '../fooditem';

Meteor.publish('menuItems', () => menuItems.find());
