import React from 'react/lib/React';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


const UserRow = function UserRow(props) {
  let displayContactButton = <div></div>;
  if (props.user.email) {
    displayContactButton = (
      <a href={'mailto:' + props.user.email + '?subject=Hi from Community!'}>
        <Button bsStyle="info" bsSize="large">
          <Glyphicon glyph="envelope" />
        </Button>
      </a>
    );
  }

  return (
    <div style={{ width: '100%', height: '100px' }}>
      <div style={{ width: '25%', float: 'left' }}>
        <Image src="/images/avatar.png" responsive style={{ margin: '0 auto' }} />
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
              {props.user.firstname} {props.user.lastname}
            </div>
            <div style={{ color: 'grey' }}>
              {props.user.profession} @ {props.user.city}
            </div>
          </div>
        </div>
        <div style={{ height: '100%', width: '35%', float: 'left' }}>
          <div style={{
            textAlign: 'center', position: 'relative',
            top: '50%', transform: 'translateY(-50%)' }}
          >
            {displayContactButton}
          </div>
        </div>
      </div>
    </div>
  );
};

UserRow.propTypes = {
  user: React.PropTypes.object,
};

export default UserRow;
