import React from 'react';
import $ from 'jquery';

import BaseComponent from './common/BaseComponent';
import UserProfile from './UserProfile';
import NavigationMenu from './NavigationMenu';

class UserProfileContainer extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentWillMount() {
    this.loadUserData();
  }

  loadUserData() {
    const userID = localStorage.getItem('userID');
    if (userID) {
      $.ajax({
        url: `/api/users/${userID}`,
        cache: false,
        success: function loadUserDataSuccess(userData) {
          this.setState({ user: userData });
        }.bind(this),
        error: function loadUserDataError(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this),
      });
    } else {
      console.error('Unable to retrieve local userID');
      this.setState({ user: null });
    }
  }

  render() {
    if (this.state.user) {
      return (
        <div>
          <NavigationMenu />
          <UserProfile profile={this.state.user} />
        </div>
      );
    }
    return (<div><NavigationMenu /><br />Loading profile...</div>);
  }
}

export default UserProfileContainer;
