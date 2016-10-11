import React from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router';

export const Index = () => (
  <div>
    <Row className="text-center landing-page">
      <div className="landing-page-content">
      <h2 style={ { fontSize: '48px', color: 'white' } }>Starting a Restaurant?</h2>
      <p style={ { fontSize: '22px', color: 'white' } }>Let us build your Restaurant Business Plan.</p>
      <p><a className="btn btn-success" href="/signup" role="button">Sign Up Now</a></p>
      <p style={ { fontSize: '16px', color: '#eeecec', fontStyle: 'italic' } }>Menu Generator, Location Research and more</p>
      </div>
    </Row>
    <Row className="about-section page bg-style1 text-center">
      <h2 style={{ fontFamily:'Lato', letterSpacing:"2px"}}>what is boneappletea?</h2>
      <div className="devider"></div>
      <Row>
        <Col sm={12} md={4}>
        <Image className="about-icon" src="/images/bone.jpg" circle />
        <h5>Bone Dry for Ideas?</h5>
        <p>Can't think of a witty restaurant name, menu, or even Business Plan? Well we got you covered. We will get you started with a comptemporary and progressively generated restaurant and business plan.</p>
        </Col>
        <Col sm={12} md={4}>
        <Image className="about-icon" src="/images/apple.png" circle />
        <h5>How do you like them Apples?</h5>
        <p>Using 'advanced' hipster terminology and algorithms, we will create a name, logo and general menu for your fine estabilishment. No imagination necessary!</p>
        </Col>
        <Col sm={12} md={4}>
        <Image className="about-icon" src="/images/tea.png" circle />
        <h5>Your Cup of Tea</h5>
        <p>Just like the Mad Hatter's Tea party, you can get up and running ASAP. Less planning more partying and hustling. You are a culinary entrepreneur now. Oh, boneappletea is like French for when food is good or something.</p>
        </Col>
      </Row>
    </Row>

    <Row className="text-center image-wrap-pic">
      <Col sm={12} md={6} className="landing-menu">
        <div className="landing-page-content">
        <h2 style={ { fontSize: '32px', color: 'rgb(45, 47, 46)', fontStyle:'italic' } }>Your Menu</h2>
        </div>
      </Col>
      <Col sm={12} md={6} className="landing-spaces">
        <div className="landing-page-content">
        <h2 style={ { fontSize: '32px', color: 'rgb(45, 47, 46)', fontStyle:'italic' } }>Your Setup</h2>
        </div>
      </Col>
    </Row>

    <Row className="text-center landing-restaurant">
      <div className="landing-page-content">
      <h2 style={ { fontSize: '48px', color: 'white' } }>Your Restaurant</h2>
      </div>
    </Row>

  </div>
);
