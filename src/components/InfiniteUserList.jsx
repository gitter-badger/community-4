import React from 'react';
import Infinite from 'react-infinite';
import $ from 'jquery';

import BaseComponent from './common/BaseComponent';
import UserRow from './UserRow';

const PAGING_ELEMENTS = 10;

export default class InfiniteUserList extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      elements: props.users,
      isInfiniteLoading: false,
      allElementsLoaded: false,
    };
    this._bind('loadNextUsersNearPosition', 'handleInfiniteLoad', 'elementInfiniteLoad');
  }

  loadNextUsersNearPosition(location, page) {
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
        page,
        where: JSON.stringify(geoPosQuery),
      },
      success: function loadNextUsersSuccess(data) {
        let noMoreElements = false;
        if (!data._links.next) {
          noMoreElements = true;
        }
        this.setState({
          isInfiniteLoading: false,
          elements: this.state.elements.concat(data._items),
          allElementsLoaded: noMoreElements,
        });
        this.props.refreshListCallback(data._items);
      }.bind(this),
      error: function loadNextUsersError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  handleInfiniteLoad() {
    if (!this.state.allElementsLoaded) {
      this.setState({ isInfiniteLoading: true });
      this.loadNextUsersNearPosition(this.props.user.location,
        (Math.ceil(this.state.elements.length / PAGING_ELEMENTS)) + 1);
    }
  }

  elementInfiniteLoad() {
    if (!this.state.allElementsLoaded) {
      return (
        <div className="infinite-list-item">
          Loading...
        </div>
      );
    }
    return false;
  }

  render() {
    return (
      <div style={{ width: '100%', height: '87%' }} >
        <Infinite
          elementHeight={100}
          containerHeight={700}
          infiniteLoadBeginEdgeOffset={100}
          onInfiniteLoad={this.handleInfiniteLoad}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          isInfiniteLoading={this.state.isInfiniteLoading}
        >
          {this.state.elements.map(element =>
            <UserRow key={element._id} user={element} />
          )}
        </Infinite>
      </div>
    );
  }
}
