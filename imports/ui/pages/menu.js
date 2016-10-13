import { Meteor } from 'meteor/meteor';
import {
  default as React,
  Component,
  PropTypes,
} from "react";
import { Row, Col, Button, Form, FormGroup, ControlLabel, FormControl, Table} from 'react-bootstrap';
import { menuItems } from '../../api/plan/fooditem'
Meteor.subscribe('menuItems');

export class MenuGenerator extends React.Component {

  constructor(props) {
    super(props);
    var subscription = menuItems.find().fetch();
    var randomIndex = Math.floor( Math.random() * subscription.length );
    var randomMenu = subscription[randomIndex];

    this.state = {
      restaurant: 'CODECORE RESTAURANT'
    };

    this.state.filterText = "";
    this.state.products = [
      {
        price: randomMenu["price"],
        name: randomMenu["title"].toLowerCase(),
      }
    ];
    this.updateState = this.updateState.bind(this);
  }

  updateState(e) {
   this.setState({
     restaurant: e.target.value
   });
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
      name: randomMenu["title"].toLowerCase(),
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
        <ProductTable
          onProductTableUpdate={this.handleProductTable.bind(this)}
          onRowAdd={this.handleAddEvent.bind(this)}
          onRowDel={this.handleRowDel.bind(this)}
          products={this.state.products}
          filterText={this.state.filterText}
          myRestaurantProp = {this.state.restaurant}
          updateStateProp = {this.updateState}
        />
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

    var menu = this.props.products.map(function(product) {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      return (
          <MenuRender onProductTableUpdate={onProductTableUpdate} product={product} key={product.id}/>
      )
    });

    return (
      <main>
        <h1>Restaurant Menu Generator</h1>
        <hr></hr>
        <Row>
          <Col xs={12} sm={12} md={6} className="menu-form">
          <FormGroup>
          <ControlLabel>Restaurant Name</ControlLabel>
          <FormControl
          type="text"
          ref="restaurantName"
          name="restaurantName"
          defaultValue={this.props.myRestaurantProp}
          onChange = {this.props.updateStateProp}
          />
          </FormGroup>

          <Button style={ { marginBottom: '15px'} } type="button" onClick={this.props.onRowAdd} bsStyle="success">Add Menu Item</Button>
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
          <div className="restaurantname">
          <h1>{this.props.myRestaurantProp}</h1>
          <hr></hr>
          {menu}
          </div>
          </Col>
        </Row>

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
class MenuRender extends React.Component {
  render() {
    return (
      <div className="menu-list-start">
        <span>{this.props.product.name}  {this.props.product.price}</span>
        <br/>
      </div>
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
