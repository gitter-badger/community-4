import React from 'react';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';

const WorldMap = function worldMap() {
  return (
      <section style={{ position: 'absolute', height: '100%', width: '100%' }}>
        <GoogleMapLoader
          containerElement={ <div style={{ height: '100%' }} /> }
          googleMapElement={
            <GoogleMap defaultZoom={3} defaultCenter={{ lat: -25.363882, lng: 131.044922 }} />
          }
        />
      </section>
    );
};

export default WorldMap;
