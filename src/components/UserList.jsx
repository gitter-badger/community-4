import React from 'react';
import $ from 'jquery';

import BaseComponent from './common/BaseComponent';
import UserTable from './UserTable';
import NavigationMenu from './NavigationMenu';

class UserList extends BaseComponent {

  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    $.ajax({
      url: '/api/users',
      cache: false,
      success: function loadDataSuccess(data) {
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
        <NavigationMenu />
        <UserTable users={this.state.users} />
      </div>
    );
  }
}

export default UserList;
