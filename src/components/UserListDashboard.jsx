import React from 'react';
import $ from 'jquery';

import BaseComponent from './common/BaseComponent';
import UpperUserListPanel from './UpperUserListPanel';
import BottomUserListPanel from './BottomUserListPanel';

class UserListDashboard extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.loadUserList();
  }

  loadUserList() {
    $.ajax({
      url: '/api/users',
      cache: false,
      success: function loadUserListSuccess(data) {
        this.setState({ users: data._items });
      }.bind(this),
      error: function loadDataError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  render() {
    return (
      <div>
        <UpperUserListPanel users={this.state.users} />
        <BottomUserListPanel users={this.state.users} />
      </div>
    );
  }
}

export default UserListDashboard;
