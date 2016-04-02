import React from 'react';
import Auth0Lock from 'auth0-lock';
import $ from 'jquery';

import config from 'config';

import BaseComponent from './common/BaseComponent';
import Home from './Home';
import Dashboard from './Dashboard';

const geolocation = (
  navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure('Your browser doesn\'t support geolocation.');
    },
  }
);

class App extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('getIdToken');
    this.state = {
      idToken: null,
      profile: null,
    };
  }

  componentWillReceiveProps() {
    this.setState({ idToken: null });
  }

  componentWillMount() {
    this.lock = new Auth0Lock(config.auth0_clientID, config.auth0_domain);
    this.setState({ idToken: this.getIdToken() });
  }

  registerUserLocation(user) {
    const updatedLocation = {
      latitude: user.latitude,
      longitude: user.longitude,
    };
    $.ajax({
      url: `/api/users/${user._id}`,
      contentType: 'application/json',
      headers: { 'If-Match': user._etag },
      type: 'PATCH',
      data: JSON.stringify(updatedLocation),
      success: function registerUserLocationSuccess() {
        console.log('User position updated.');
      },
      error: function registerUserLocationError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  registerNewUser(profile) {
    const user = {
      user_id: profile.user_id,
      firstname: profile.given_name,
      lastname: profile.family_name,
      email: '',
      city: profile.location.name,
      profession: profile.headline,
      latitude: profile.latitude,
      longitude: profile.longitude,
    };
    $.ajax({
      url: '/api/users',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(user),
      success: function registerNewUserSuccess(data) {
        console.log('User created');
        user._id = data._id;
        this.setState({ profile: user });
        localStorage.setItem('userID', data._id);
      }.bind(this),
      error: function registerNewUserError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  getUserLocationAndExecCallback(userProfile, callback) {
    const user = userProfile;
    user.latitude = 0.0;
    user.longitude = 0.0;
    geolocation.getCurrentPosition((position) => {
      user.latitude = position.coords.latitude;
      user.longitude = position.coords.longitude;
      callback(user);
    }, () => {
      console.log('Unable to retrieve current position.');
      callback(user);
    });
  }

  registerUserIfNotExisting(profile) {
    $.ajax({
      url: '/api/users',
      data: {
        user_id: profile.user_id,
      },
      dataType: 'json',
      cache: false,
      success: function registerUserIfNotExistingSuccess(data) {
        if (data._items.length !== 0) {
          console.log('User exists!');
          const userProfile = data._items[0];
          this.setState({ profile: userProfile });
          this.getUserLocationAndExecCallback(userProfile, this.registerUserLocation.bind(this));
          localStorage.setItem('userID', userProfile._id);
        } else {
          console.log('User do not exists! It will be created.');
          const userProfile = profile;
          this.getUserLocationAndExecCallback(userProfile, this.registerNewUser.bind(this));
        }
      }.bind(this),
      error: function registerUserIfNotExistingError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  getProfileAndUpdateUser(idToken) {
    this.lock.getProfile(idToken, (err, profile) => {
      if (err) {
        console.log('Error loading the Profile', err);
        return;
      }
      this.registerUserIfNotExisting(profile);
    });
  }

  getProfile(userID) {
    $.ajax({
      url: `/api/users/${userID}`,
      cache: false,
      success: function getProfileSuccess(userData) {
        this.setState({ profile: userData });
      }.bind(this),
      error: function getProfileError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  getIdToken() {
    let idToken = localStorage.getItem('userToken');
    const userID = localStorage.getItem('userID');
    const authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('userToken', authHash.id_token);
        this.getProfileAndUpdateUser(idToken);
      }
      if (authHash.error) {
        console.log('Error signing in', authHash);
        return null;
      }
    } else if (idToken && userID) {
      this.getProfile(userID);
    }
    return idToken;
  }

  render() {
    if (this.state.idToken) {
      if (this.state.profile) {
        return (
          <Dashboard user={this.state.profile} />
        );
      }
      return (<div>Loading dashboard...</div>);
    }
    return (<Home lock={this.lock} />);
  }
}

export default App;
