import React from 'react';

import NavigationMenu from './NavigationMenu';
import UserList from './UserList';

const UpperUserListPanel = function UpperUserListPanel(props) {
  return (
    <div>
      <NavigationMenu />
      Upper Panel
      <UserList users={props.users} />
    </div>
  );
};

UpperUserListPanel.propTypes = {
  users: React.PropTypes.array,
};

export default UpperUserListPanel;
