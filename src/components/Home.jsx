import React from 'react/lib/React';
import Button from 'react-bootstrap/lib/Button';

import BaseComponent from './common/BaseComponent';

class Home extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('showAuth0Lock');
  }

  showAuth0Lock() {
    this.props.lock.show();
  }

  render() {
    return (
      <div style={{ width: '100%',
        height: '100%',
        backgroundImage: 'url(/images/community.jpg)',
        backgroundSize: 'cover' }}
      >
        <div style={{ textAlign: 'center', position: 'relative',
          top: '50%', transform: 'translateY(-50%)' }}
        >
          <div style={{ fontSize: '3.7em', fontStyle: 'bold' }}>
            Welcome to the community
          </div>
          <div style={{ marginTop: '25px' }}>
            <Button onClick={this.showAuth0Lock} bsStyle="primary" bsSize="large">
              Join us !
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
