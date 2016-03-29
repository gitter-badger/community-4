import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import Redirect from 'react-router/lib/Redirect';

import App from './components/App';
import UserList from './components/UserList';
import LogOut from './components/LogOut';

ReactDOM.render(
  <Router history={browserHistory}>
  <Redirect from="/" to="/home" />
  <Route path="/home" component={App} />
  <Route path="/users" component={UserList} />
  <Route path="/logout" component={LogOut} />
</Router>, document.getElementById('main'));
