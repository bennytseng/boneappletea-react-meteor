import React from 'react';
import { Grid } from 'react-bootstrap';
import AppNavigation from '../containers/app-navigation';
import { Footer } from '../components/app-footer';

export const App = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
  },
  render() {
    return <div>
      <AppNavigation className="app-nav"/>
      <Grid className="app-grid">
        { this.props.children }
      </Grid>
      <Footer className="app-footer"/>
    </div>;
  },
});
