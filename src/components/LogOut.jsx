import React from 'react';

import BaseComponent from './common/BaseComponent';

class LogOut extends BaseComponent {

  constructor() {
    super();
    this._bind('onClick');
  }

  onClick() {
    localStorage.removeItem('userToken');
    this.context.router.push('/');
  }

  render() {
    return (
      <a onClick={this.onClick}>Log out</a>
    );
  }
}

LogOut.contextTypes = {
  router: React.PropTypes.object,
};


export default LogOut;
