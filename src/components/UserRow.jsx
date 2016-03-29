import React from 'react';

const UserRow = function UserRow(props) {
  return (
    <tr>
      <td>{props.user_profile.firstname}</td>
      <td>{props.user_profile.lastname}</td>
      <td>{props.user_profile.email}</td>
      <td>{props.user_profile.city}</td>
      <td>{props.user_profile.profession}</td>
    </tr>
  );
};

UserRow.propTypes = {
  user_profile: React.PropTypes.object,
};

export default UserRow;
