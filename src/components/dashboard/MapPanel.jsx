import React from 'react/lib/React';

import WorldMap from './map/WorldMap';

const MapPanel = function MapPanel(props) {
  return (
    <div style={{ width: '65%', float: 'left' }}>
      <WorldMap user={props.user} users={props.users}
        refreshPlaceCallback={props.refreshPlaceCallback}
      />
    </div>
  );
};

MapPanel.propTypes = {
  users: React.PropTypes.array,
  user: React.PropTypes.object.isRequired,
  refreshPlaceCallback: React.PropTypes.func.isRequired,
};

export default MapPanel;
