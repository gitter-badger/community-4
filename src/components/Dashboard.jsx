import React from 'react';
import $ from 'jquery';

import BaseComponent from './common/BaseComponent';
import ActionPanel from './ActionPanel';
import MapPanel from './MapPanel';

const PAGING_ELEMENTS = 10;

class Dashboard extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('refreshUserList');
    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    this.loadUsersNearPosition(this.props.user.location);
  }

  refreshUserList(newUsers) {
    const users = this.state.users;
    this.setState({ users: users.concat(newUsers) });
  }

  removeUserFromArray(arr, user) {
    for (let i = arr.length; i--;) {
      if (arr[i]._id === user._id) {
        arr.splice(i, 1);
      }
    }
  }

  loadUsersNearPosition(location) {
    const geoPosQuery = {
      location: {
        $near: {
          $geometry: location,
        },
      },
    };
    $.ajax({
      url: '/api/users',
      cache: false,
      data: {
        max_results: PAGING_ELEMENTS,
        page: 1,
        where: JSON.stringify(geoPosQuery),
      },
      success: function loadUsersNearPositionSuccess(data) {
        this.removeUserFromArray(data._items, this.props.user);
        this.setState({ users: data._items });
      }.bind(this),
      error: function loadUsersNearPositionError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  render() {
    if (this.state.users) {
      return (
        <div style={{ height: '100%', width: '100%' }} >
          <ActionPanel user={this.props.user} users={this.state.users}
            refreshListCallback={this.refreshUserList}
          />
          <MapPanel user={this.props.user} users={this.state.users} />
        </div>
      );
    }
    return (<div>Loading dashboard...</div>);
  }
}

export default Dashboard;
