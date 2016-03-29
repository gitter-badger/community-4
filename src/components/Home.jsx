import React from 'react';

import BaseComponent from './common/BaseComponent';

class Home extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('showLock');
  }

  showLock() {
    this.props.lock.show();
  }

  render() {
    return (
      <div className="login-box">
        <a onClick={this.showLock}>Sign In</a>
      </div>
    );
  }
}

export default Home;
