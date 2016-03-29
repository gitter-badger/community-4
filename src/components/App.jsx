import React from 'react';
import Auth0Lock from 'auth0-lock';

import config from 'config';

import BaseComponent from './common/BaseComponent';
import Home from './Home';
import LoggedIn from './LoggedIn';

class App extends BaseComponent {

  constructor() {
    super();
    this._bind('getIdToken');
    this.state = {
      idToken: null,
    };
  }

  componentWillReceiveProps() {
    this.setState({ idToken: null });
  }

  componentWillMount() {
    this.lock = new Auth0Lock(config.auth0_clientID, config.auth0_domain);
    this.setState({ idToken: this.getIdToken() });
  }

  getIdToken() {
    let idToken = localStorage.getItem('userToken');
    const authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log('Error signing in', authHash);
        return null;
      }
    }
    return idToken;
  }

  render() {
    if (this.state.idToken) {
      return (<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
    }
    return (<Home lock={this.lock} />);
  }
}

export default App;
