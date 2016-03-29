import React from 'react';
import $ from 'jquery';

import BaseComponent from './common/BaseComponent';
import UserProfile from './UserProfile';
import LogOut from './LogOut';

class LoggedIn extends BaseComponent {

  constructor() {
    super();
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
          this.setState({ profile: data._items[0] });
        } else {
          console.log('User do not exists! It will be created.');
          this.registerNewUser(profile);
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
          <UserProfile profile={this.state.profile} />
          <div className="logout-box">
            <LogOut />
          </div>
        </div>
      );
    }
    return (
      <div className="loading">Loading profile</div>
    );
  }
}

export default LoggedIn;
