import React from 'react';

import WorldMap from './WorldMap';

const MapPanel = function MapPanel(props) {
  return (
    <div style={{ width: '65%', float: 'left' }}>
      <WorldMap user={props.user} users={props.users} />
    </div>
  );
};

MapPanel.propTypes = {
  users: React.PropTypes.array,
  user: React.PropTypes.object.isRequired,
};

export default MapPanel;
