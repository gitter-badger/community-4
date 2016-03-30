import React from 'react';

import NavigationMenu from './NavigationMenu';
import UserProfile from './UserProfile';

const UpperUserPanel = function UpperUserPanel(props) {
  return (
    <div>
      <NavigationMenu />
      Upper Panel
      <UserProfile profile={props.profile} />
    </div>
  );
};

UpperUserPanel.propTypes = {
  profile: React.PropTypes.object.isRequired,
};


export default UpperUserPanel;
