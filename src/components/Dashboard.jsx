import React from 'react';
import $ from 'jquery';

import BaseComponent from './common/BaseComponent';
import ActionPanel from './ActionPanel';
import MapPanel from './MapPanel';

class Dashboard extends BaseComponent {

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
      error: function loadUserListError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  render() {
    return (
      <div>
        <ActionPanel users={this.state.users} />
        <MapPanel users={this.state.users} />
      </div>
    );
  }
}

export default Dashboard;
