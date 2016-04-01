import React from 'react';
import $ from 'jquery';

import BaseComponent from './common/BaseComponent';
import ActionPanel from './ActionPanel';
import MapPanel from './MapPanel';

const PAGING_ELEMENTS = 10;

class Dashboard extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    this.loadUserList();
  }

  removeUserFromArray(arr, user) {
    for (let i = arr.length; i--;) {
      if (arr[i]._id === user._id) {
        arr.splice(i, 1);
      }
    }
  }

  loadUserList() {
    $.ajax({
      url: '/api/users',
      cache: false,
      data: {
        max_results: PAGING_ELEMENTS,
        page: 1,
      },
      success: function loadUserListSuccess(data) {
        this.removeUserFromArray(data._items, this.props.user);
        this.setState({ users: data._items });
      }.bind(this),
      error: function loadUserListError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  render() {
    if (this.state.users) {
      return (
        <div>
          <ActionPanel users={this.state.users} />
          <MapPanel users={this.state.users} />
        </div>
      );
    }
    return (<div>Loading dashboard...</div>);
  }
}

export default Dashboard;
