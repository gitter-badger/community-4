import React from 'react/lib/React';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import BaseComponent from '../../common/BaseComponent';

class ProfileBar extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('logOut');
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.context.router.push('/');
  }

  render() {
    let displayAvatar = (
      <Image src="/images/avatar.png" responsive style={{ margin: '0 auto' }} />
    );
    if (this.props.user.avatar) {
      displayAvatar = (
        <Image src={this.props.user.avatar} responsive style={{
          margin: '0 auto',
          position: 'relative', top: '50%',
          transform: 'translateY(-50%)' }}
        />
      );
    }

    return (
      <div style={{ width: '100%', height: '13%' }}>
        <div style={{ height: '100%', width: '25%', float: 'left' }}>
          {displayAvatar}
        </div>
        <div style={{ height: '100%', width: '75%', float: 'left' }}>
          <div style={{ height: '100%', width: '65%', float: 'left' }}>
            <div style={{
              textAlign: 'center',
              position: 'relative', top: '50%',
              transform: 'translateY(-50%)' }}
            >
              <div style={{
                fontSize: '1.7em',
                fontStyle: 'bold' }}
              >
                Welcome {this.props.user.firstname}
              </div>
              <div style={{ color: 'grey' }}>
                <a onClick={function notImpl() { alert('Not implemented yet.'); }}>
                  Edit my profile <Glyphicon glyph="wrench" />
                </a>
              </div>
            </div>
          </div>
          <div style={{ height: '100%', width: '35%', float: 'left' }}>
            <div style={{
              textAlign: 'center', position: 'relative',
              top: '50%', transform: 'translateY(-50%)' }}
            >
              <Button onClick={this.logOut} bsStyle="danger" bsSize="large">
                <Glyphicon glyph="off" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileBar.contextTypes = {
  router: React.PropTypes.object,
};

ProfileBar.propTypes = {
  user: React.PropTypes.object.isRequired,
};

export default ProfileBar;
