import React from 'react';

const UserRow = function UserRow(props) {
  return (
    <div style={{ height: '50px' }}>
      {props.user.firstname} {props.user.lastname} - {props.user.email}
      - {props.user.profession} @ {props.user.city}
    </div>
  );
};

UserRow.propTypes = {
  user: React.PropTypes.object,
};

export default UserRow;
