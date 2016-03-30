import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import Redirect from 'react-router/lib/Redirect';

import App from './components/App';
import LogOut from './components/LogOut';
import BottomPanel from './components/BottomPanel';

const UserListWrapper = function userListWrapper() {
  return (<App display="userList" />);
};

const HomeWrapper = function homeWrapper() {
  return (<App display="home" />);
};


ReactDOM.render(
  <Router history={browserHistory}>
  <Redirect from="/" to="/home" />
  <Route path="/home" component={HomeWrapper} />
  <Route path="/users" component={UserListWrapper} />
  <Route path="/logout" component={LogOut} />
  <Route path="/test" component={BottomPanel} />
</Router>, document.getElementById('main'));
