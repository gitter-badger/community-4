import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import Redirect from 'react-router/lib/Redirect';

import App from './components/App';
import UserProfileContainer from './components/UserProfileContainer';
import LogOut from './components/LogOut';
import UserGeneratorMap from './components/UserGeneratorMap';

ReactDOM.render(
  <Router history={browserHistory}>
  <Redirect from="/" to="/home" />
  <Route path="/home" component={App} />
  <Route path="/profile" component={UserProfileContainer} />
  <Route path="/logout" component={LogOut} />
  <Route path="/map" component={UserGeneratorMap} />
</Router>, document.getElementById('main'));
