import { Meteor } from 'meteor/meteor';
import {
  default as React,
  Component,
  PropTypes,
} from "react";

import { Row, Col, Modal, Button,Form, FormGroup, ControlLabel, FormControl, HelpBlock, Table} from 'react-bootstrap';
import faker from 'faker';

import { menuItems } from '../../api/plan/fooditem'
Meteor.subscribe('menuItems');

export class test2 extends Component {


  constructor(props) {
    super(props);
    this.state = {
      restaurant: faker.name.findName()
      // menu:
    };
  }

  render() {
    var subscription = menuItems.find().fetch();
    var randomIndex = Math.floor( Math.random() * subscription.length );
    var randomMenu = subscription[randomIndex];
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
            defaultValue={this.state.restaurant}
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
              defaultValue={randomMenu["title"]}
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
              defaultValue={randomMenu["price"]}
              />
            </FormGroup>
          </Col>
        </Row>
      </main>
    )
  }
}

export class test1 extends React.Component {

  constructor(props) {
    super(props);
    var subscription = menuItems.find().fetch();
    var randomIndex = Math.floor( Math.random() * subscription.length );
    var randomMenu = subscription[randomIndex];
    this.state = {};
    this.state.filterText = "";
    this.state.products = [
      {
        price: '13',
        name: 'CodeCore Meatloaf',
      }, {
        price: randomMenu["price"],
        name: randomMenu["title"],
      }
    ];

  }
  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };

  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  };

  handleAddEvent(evt) {
    var subscription = menuItems.find().fetch();
    var randomIndex = Math.floor( Math.random() * subscription.length );
    var randomMenu = subscription[randomIndex];

    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      name: randomMenu["title"],
      price: randomMenu["price"],
    }
    this.state.products.push(product);
    this.setState(this.state.products);

  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var products = this.state.products;

    var newProducts = products.map(function(product) {
      for (var key in product) {
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;

        }
      }
      return product;
    });
    this.setState(newProducts);
  };
  render() {

    return (
      <div>
        <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
      </div>
    );

  }

}

class ProductTable extends React.Component {

  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function(product) {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
    });
    return (
      <main>
        <h1>Restaurant Menu Generator</h1>
        <hr></hr>
        <Col xs={12} sm={12} md={6} className="menu-form">
          <FormGroup>
          <ControlLabel>Restaurant Name</ControlLabel>
          <FormControl
          type="text"
          ref="restaurantName"
          name="restaurantName"
          defaultValue={faker.name.findName()}
          />
          </FormGroup>

          <Button type="button" onClick={this.props.onRowAdd} bsStyle="success">Add Menu Item</Button>
          <Table className="menu-item-table" bordered striped hover>
          <thead>
          <tr>
          <th>Menu Item</th>
          <th>Item Price</th>
          </tr>
          </thead>
          <tbody>{product}</tbody>
          </Table>
        </Col>
        <Col xs={12} sm={12} md={6} className="menu-image">
          <div id="restaurantname"> The Gundam </div>
        </Col>


      </main>
    );
  }
}

class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);
  }
  render() {
    return (
      <tr className="eachRow">
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "name",
          value: this.props.product.name,
          id: this.props.product.id

        }}/>
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "price",
          value: this.props.product.price,
          id: this.props.product.id

        }}/>
        <td className="del-cell">
          <Button onClick={this.onDelEvent.bind(this)} bsStyle="danger">Delete</Button>
        </td>
      </tr>
    );

  }

}
class EditableCell extends React.Component {
  render() {
    return (
      <td>
        <FormControl type='text' name={this.props.cellData.type} id={this.props.cellData.id} defaultValue={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
      </td>
    );
  }
}
