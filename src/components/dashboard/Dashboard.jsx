import React from 'react/lib/React';
import $ from 'jquery';
import Loader from 'react-loader';

import BaseComponent from '../common/BaseComponent';
import ActionPanel from './ActionPanel';
import MapPanel from './MapPanel';
import ErrorView from '../error/ErrorView';

const PAGING_ELEMENTS = 10;

class Dashboard extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('refreshUserList', 'loadUsersNearPosition', 'setError');
    this._locationReference = this.props.user.location;
    this.state = {
      loaded: false,
      users: null,
      error: null,
    };
  }

  componentDidMount() {
    this.loadUsersNearPosition(this._locationReference);
  }

  setError(msg, cause) {
    const error = {
      cause,
      msg,
    };
    this.setState({ error });
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
    this._locationReference = location;
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
        this.setState({ users: data._items, loaded: true });
      }.bind(this),
      error: function loadUsersNearPositionError(xhr, status, err) {
        this.setError('User loading request failed', err);
      }.bind(this),
    });
  }

  render() {
    if (this.state.error) {
      return (<ErrorView error={this.state.error} />);
    }

    return (
      <Loader loaded={this.state.loaded} style={{ height: '100%', width: '100%' }}>
        <div style={{ height: '100%', width: '100%' }} >
          <ActionPanel user={this.props.user} users={this.state.users}
            refreshListCallback={this.refreshUserList}
            locationReference={this._locationReference}
            warning={this.props.warning}
          />
          <MapPanel user={this.props.user} users={this.state.users}
            refreshPlaceCallback={this.loadUsersNearPosition}
          />
        </div>
      </Loader>
    );
  }
}

export default Dashboard;
