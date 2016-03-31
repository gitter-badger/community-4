import React from 'react';

import UserTable from './UserTable';

const UserList = function userList(props) {
  return (
    <div>
      <UserTable users={props.users} />
    </div>
  );
};

UserList.propTypes = {
  users: React.PropTypes.array,
};

export default UserList;
