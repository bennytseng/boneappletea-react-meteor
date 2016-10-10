import React from 'react';
import { browserHistory } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `@${name.user}` : '';
};

export const AuthenticatedNavigation = () => (
  <div>
    <Nav>
      <LinkContainer to="/new">
        <NavItem eventKey={ 1 } href="/new">Create a Plan</NavItem>
      </LinkContainer>
      <LinkContainer to="/test">
      <NavItem eventKey={ 2 } href="/test">test</NavItem>
      </LinkContainer>
      <LinkContainer to="/research">
        <NavItem eventKey={ 3 } href="/research">Plan Research</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 4 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 4.1 } onClick={ handleLogout }>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);
