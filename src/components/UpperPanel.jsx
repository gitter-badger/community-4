import React from 'react';

import NavigationMenu from './NavigationMenu';
import UserProfile from './UserProfile';
import UserList from './UserList';

const UpperPanel = function UpperPanel(props) {
  let renderedElement = null;

  switch (props.display) {
    case 'userList':
      renderedElement = (
          <UserList />
      );
      break;
    default:
      renderedElement = (
        <UserProfile profile={props.profile} />
      );
      break;
  }

  return (
    <div>
      <NavigationMenu />
      Upper Panel
      {renderedElement}
    </div>
  );
};

UpperPanel.propTypes = {
  display: React.PropTypes.string.isRequired,
  profile: React.PropTypes.object,
};


export default UpperPanel;
