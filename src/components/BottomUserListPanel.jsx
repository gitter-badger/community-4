import React from 'react';

import UserListWorldMap from './UserListWorldMap';

const BottomUserListPanel = function BottomUserListPanel(props) {
  return (<UserListWorldMap users={props.users} />);
};

BottomUserListPanel.propTypes = {
  users: React.PropTypes.array,
};

export default BottomUserListPanel;
