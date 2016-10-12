import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { Row, Col, Button, Image } from 'react-bootstrap';


export class Footer extends React.Component {
  render() {
    return <footer>
    <Col xs={ 12 } sm={ 6 } md={ 6 }>
      <div>
        <h3>boneappletea</h3>
        <p>Well, it is a planning and utility tool for people to start their own restaurant. It could also be French or something, when food is hella good.</p>
        <br></br>
        <p>Created By Benny Tseng | CodeCore | Meteor : React</p>
      </div>
    </Col>
    <Col xs={ 12 } sm={ 6 } md={ 6 }>
      <div>
          <h5>Contact Us</h5>
          <ul>
            <li>Who we are</li>
            <li>How we work</li>
          </ul>
          <h5>FAQ</h5>
          <ul>
            <li>Ok seriously, what's does boneappletea mean?</li>
            <li>C'mon</li>
          </ul>
      </div>
    </Col>
    </footer>
  }
}
