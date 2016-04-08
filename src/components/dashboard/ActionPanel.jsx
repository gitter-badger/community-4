import React from 'react/lib/React';

import InfiniteUserList from './userlist/InfiniteUserList';
import ProfileBar from './profile/ProfileBar';
import WarningAlert from '../error/WarningAlert';

const ActionPanel = function ActionPanel(props) {
  let userList = <div>Sorry, no users found.</div>;
  if (props.users.length !== 0) {
    userList = (
      <InfiniteUserList user={props.user} users={props.users}
        refreshListCallback={props.refreshListCallback}
        locationReference={props.locationReference}
      />);
  }
  let warningAlert = false;
  if (props.warning) {
    warningAlert = (
      <WarningAlert message={props.warning.msg} />
    );
  }

  return (
    <div style={{ height: '100%', width: '35%', float: 'left' }}>
      {warningAlert}
      <ProfileBar user={props.user} />
      {userList}
    </div>
  );
};

ActionPanel.propTypes = {
  users: React.PropTypes.array,
  warning: React.PropTypes.object,
  user: React.PropTypes.object.isRequired,
  locationReference: React.PropTypes.object.isRequired,
  refreshListCallback: React.PropTypes.func.isRequired,
};

export default ActionPanel;
