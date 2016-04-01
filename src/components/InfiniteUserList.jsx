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
    this._bind('loadNextUsers', 'handleInfiniteLoad', 'elementInfiniteLoad');
  }

  loadNextUsers(page) {
    $.ajax({
      url: '/api/users',
      cache: false,
      data: {
        max_results: PAGING_ELEMENTS,
        page,
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
      }.bind(this),
      error: function loadNextUsersError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  handleInfiniteLoad() {
    if (!this.state.allElementsLoaded) {
      this.setState({ isInfiniteLoading: true });
      this.loadNextUsers((Math.ceil(this.state.elements.length / PAGING_ELEMENTS)) + 1);
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
      <div style={{ height: '250px' }}>
        <Infinite
          elementHeight={50}
          containerHeight={250}
          infiniteLoadBeginEdgeOffset={50}
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
