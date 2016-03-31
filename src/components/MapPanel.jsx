import React from 'react';

import WorldMap from './WorldMap';

const MapPanel = function MapPanel(props) {
  return (<WorldMap users={props.users} />);
};

MapPanel.propTypes = {
  users: React.PropTypes.array,
};

export default MapPanel;
