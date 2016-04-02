import React from 'react';

import InfiniteUserList from './InfiniteUserList';
import ProfileBar from './ProfileBar';

const ActionPanel = function ActionPanel(props) {
  let userList = <div>Sorry, no users found.</div>;
  if (props.users.length !== 0) {
    userList = <InfiniteUserList users={props.users} />;
  }

  return (
    <div style={{ height: '100%', width: '35%', float: 'left' }}>
      <ProfileBar user={props.user} />
      {userList}
    </div>
  );
};

ActionPanel.propTypes = {
  users: React.PropTypes.array,
  user: React.PropTypes.object.isRequired,
};

export default ActionPanel;
