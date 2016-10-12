import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '../../ui/layouts/app';

import { Index } from '../../ui/pages/index';
import { Login } from '../../ui/pages/login';
import { NotFound } from '../../ui/pages/not-found';
import { RecoverPassword } from '../../ui/pages/recover-password';
import { ResetPassword } from '../../ui/pages/reset-password';
import { Signup } from '../../ui/pages/signup';


//work in progress
import mapApp from '../../ui/pages/map2';

//testing pages
import { test } from '../../ui/pages/test';
import { Documents } from '../../ui/pages/documents';

//complete
import { NewPlan } from '../../ui/pages/new';
import { MenuGenerator } from '../../ui/pages/menu';


const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } />

        <Route name="Create new Plan" path="/new" component={ NewPlan } onEnter={ requireAuth } />
        <Route name="test" path="/test" component={ test } onEnter={ requireAuth } />

        <Route name="Menu" path="/menu" component={ MenuGenerator } onEnter={ requireAuth } />
        <Route name="Plan Research" path="/research" component={ mapApp } onEnter={ requireAuth } />

        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
