import React from 'react/lib/React';
import Auth0Lock from 'auth0-lock';
import $ from 'jquery';
import Loader from 'react-loader';

import BaseComponent from './common/BaseComponent';
import Home from './Home';
import Dashboard from './dashboard/Dashboard';
import ErrorView from './error/ErrorView';

class App extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('getIdToken', 'setError', 'setWarning');
    this.state = {
      idToken: null,
      profile: null,
      loaded: false,
      error: null,
      warning: null,
    };
  }

  componentWillReceiveProps() {
    this.setState({ idToken: null });
  }

  componentWillMount() {
    this.lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN);
    this.setState({ idToken: this.getIdToken() });
  }

  setError(msg, cause) {
    const error = {
      cause,
      msg,
    };
    this.setState({ error });
  }

  setWarning(msg) {
    const warning = {
      msg,
    };
    this.setState({ warning });
  }

  registerUserLocation(user) {
    const updatedLocation = {
      location: user.location,
    };
    $.ajax({
      url: `/api/users/${user._id}`,
      contentType: 'application/json',
      headers: { 'If-Match': user._etag },
      type: 'PATCH',
      data: JSON.stringify(updatedLocation),
      success: function registerUserLocationSuccess() {
        this.setState({ profile: user, loaded: true });
      }.bind(this),
      error: function registerUserLocationError() {
        this.setWarning('Unable to persist your new position.');
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
      location: profile.location,
      avatar: profile.picture,
    };
    $.ajax({
      url: '/api/users',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(user),
      success: function registerNewUserSuccess(data) {
        user._id = data._id;
        this.setState({ profile: user, loaded: true });
        localStorage.setItem('userID', data._id);
      }.bind(this),
      error: function registerNewUserError(xhr, status, err) {
        this.setError('User registration request failed', err);
      }.bind(this),
    });
  }

  getUserLocationAndExecCallback(userProfile, callback) {
    const user = userProfile;
    user.location = {
      type: 'Point',
      coordinates: [-122.41941550000001, 37.7749295],
    };
    if (!navigator.geolocation) {
      this.setWarning('Your browser doesn\'t support geolocation.');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      user.location.coordinates = [position.coords.longitude, position.coords.latitude];
      callback(user);
    }, () => {
      this.setWarning('Unable to retrieve your current location.');
      callback(user);
    },
    { enableHighAccuracy: true, timeout: 5000 });
  }

  registerUserIfNotExisting(profile) {
    $.ajax({
      url: '/api/users',
      data: {
        where: JSON.stringify({ user_id: profile.user_id }),
      },
      dataType: 'json',
      cache: false,
      success: function registerUserIfNotExistingSuccess(data) {
        if (data._items.length !== 0) {
          const userProfile = data._items[0];
          this.getUserLocationAndExecCallback(userProfile, this.registerUserLocation.bind(this));
          localStorage.setItem('userID', userProfile._id);
        } else {
          const userProfile = profile;
          this.getUserLocationAndExecCallback(userProfile, this.registerNewUser.bind(this));
        }
      }.bind(this),
      error: function registerUserIfNotExistingError(xhr, status, err) {
        this.setError('User existence verification request failed', err);
      }.bind(this),
    });
  }

  getProfileAndUpdateUser(idToken) {
    this.lock.getProfile(idToken, (err, profile) => {
      if (err) {
        this.setError('Auth0 user profile access failed', err);
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
        this.setState({ profile: userData, loaded: true });
      }.bind(this),
      error: function getProfileError(xhr, status, err) {
        this.setError('User profile access request failed', err);
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
        this.setError('Auth0 authentication error', authHash.error);
        return null;
      }
    } else if (idToken && userID) {
      this.getProfile(userID);
    }
    return idToken;
  }

  render() {
    if (this.state.error) {
      return (<ErrorView error={this.state.error} />);
    }
    if (this.state.idToken) {
      return (
        <Loader loaded={this.state.loaded}>
          <Dashboard user={this.state.profile} warning={this.state.warning} />
        </Loader>
      );
    }
    return (<Home lock={this.lock} />);
  }
}

export default App;
