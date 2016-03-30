import React from 'react';
import $ from 'jquery';

import BaseComponent from './common/BaseComponent';
import UpperUserPanel from './UpperUserPanel';
import BottomUserPanel from './BottomUserPanel';

const geolocation = (
  navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure('Your browser doesn\'t support geolocation.');
    },
  }
);

class UserDashboard extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }

  componentDidMount() {
    this.props.lock.getProfile(this.props.idToken, (err, profile) => {
      if (err) {
        console.log('Error loading the Profile', err);
        return;
      }
      this.registerUserIfNotExisting(profile);
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
    }, (reason) => {
      console.log(`Unable to retrieve current position: ${reason}`);
      callback(user);
    });
  }

  registerUserLocation(user) {
    const updatedLocation = {
      latitude: user.latitude,
      longitude: user.longitude,
    };
    $.ajax({
      url: `/api/users/${user.user_id}`,
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

  registerUserIfNotExisting(profile) {
    $.ajax({
      url: '/api/users',
      data: {
        user_id: profile.user_id,
      },
      dataType: 'json',
      cache: false,
      success: function loadDataSuccess(data) {
        if (data._items.length !== 0) {
          console.log('User exists!');
          const userProfile = data._items[0];
          this.setState({ profile: userProfile });
          this.getUserLocationAndExecCallback(userProfile, this.registerUserLocation.bind(this));
        } else {
          console.log('User do not exists! It will be created.');
          const userProfile = profile;
          this.getUserLocationAndExecCallback(userProfile, this.registerNewUser.bind(this));
        }
      }.bind(this),
      error: function loadDataError(xhr, status, err) {
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
      success: function addBugSuccess() {
        console.log('User created');
        this.setState({ profile: user });
      }.bind(this),
      error: function addBugError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  render() {
    if (this.state.profile) {
      return (
        <div>
          <UpperUserPanel profile={this.state.profile} />
          <BottomUserPanel />
        </div>
      );
    }
    return (
      <div className="loading">Loading dashboard...</div>
    );
  }
}

export default UserDashboard;
