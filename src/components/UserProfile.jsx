import React from 'react';

const UserProfile = function userProfile(props) {
  return (
    <div className="user-profile">
      User: {props.profile.firstname} {props.profile.lastname}
      <br />
      Email: {props.profile.email}
      <br />
      City: {props.profile.city}
      <br />
      Profession: {props.profile.profession}
    </div>
  );
};

UserProfile.propTypes = {
  profile: React.PropTypes.object,
};

export default UserProfile;
