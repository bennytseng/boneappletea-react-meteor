import {
  default as React,
  Component,
  PropTypes,
} from "react";
import { Meteor } from 'meteor/meteor';

import { Row, Col, Modal, Button,Form, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import faker from 'faker';
import { menuItems } from '../../api/plan/fooditem'
Meteor.subscribe('menuItems', () => menuItems.find());

var array = menuItems.find().fetch();
var randomIndex = Math.floor( Math.random() * array.length );
var element = array[randomIndex];

var title1 = {
  restaurant: faker.name.findName(),
  // item: element.title,
  // price: element.price,
}

export class test1 extends Component {
  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(e) {
  this.setState({ value: e.target.value });
  }

  render() {
    console.log(menuItems.find().fetch())
    return (
      <main>
        <h1>Restaurant Menu Generator</h1>
        <hr></hr>
        <FormGroup>
          <ControlLabel>Restaurant Name</ControlLabel>
          <FormControl
            type="text"
            ref="firstName"
            name="firstName"
            value={faker.name.findName()}
          />
        </FormGroup>
        <Row>
          <Col xs={ 6 } sm={ 6 }>
            <FormGroup>
              <ControlLabel>Menu Item</ControlLabel>
              <FormControl
              type="text"
              ref="menuItem"
              name="manuItem"
              value={faker.name.findName()}
              />
            </FormGroup>
          </Col>
          <Col xs={ 6 } sm={ 6 }>
            <FormGroup>
              <ControlLabel>Item Price</ControlLabel>
              <FormControl
              type="float"
              ref="itemPrice"
              name="itemPrice"
              value={faker.name.findName()}
              />
            </FormGroup>
          </Col>
        </Row>
      </main>
    )
  }
}
