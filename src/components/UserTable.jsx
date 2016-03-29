import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import UserRow from './UserRow';

const UserTable = function userTable(props) {
  const userRows = props.users.map(
      user => <UserRow key={user._id} user_profile={user} />);

  return (
    <Table striped bordered condensed responsive>
      <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
          <th>City</th>
          <th>Profession</th>
        </tr>
      </thead>
      <tbody>
        {userRows}
      </tbody>
    </Table>
  );
};

UserTable.propTypes = {
  users: React.PropTypes.array,
};

export default UserTable;
