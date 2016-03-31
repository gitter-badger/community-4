import React from 'react';

import NavigationMenu from './NavigationMenu';
import UserList from './UserList';

const ActionPanel = function ActionPanel(props) {
  let displayUserTable = <div>Sorry, no users found.</div>;
  if (props.users.length !== 0) {
    displayUserTable = <UserList users={props.users} />;
  }

  return (
    <div>
      <NavigationMenu />
      Action Panel
      {displayUserTable}
    </div>
  );
};

ActionPanel.propTypes = {
  users: React.PropTypes.array,
};

export default ActionPanel;
