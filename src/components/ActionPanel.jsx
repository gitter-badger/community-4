import React from 'react';

import NavigationMenu from './NavigationMenu';
import UserList from './UserList';

const ActionPanel = function ActionPanel(props) {
  return (
    <div>
      <NavigationMenu />
      Action Panel
      <UserList users={props.users} />
    </div>
  );
};

ActionPanel.propTypes = {
  users: React.PropTypes.array,
};

export default ActionPanel;
