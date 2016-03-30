import React from 'react';
import { GoogleMapLoader, GoogleMap } from 'react-google-maps';

import BaseComponent from './common/BaseComponent';

const geolocation = (
  navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure('Your browser doesn\'t support geolocation.');
    },
  }
);

class WorldMap extends BaseComponent {

  constructor() {
    super();
    this.state = {
      center: null,
    };
  }

  componentDidMount() {
    geolocation.getCurrentPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    }, (reason) => {
      console.log(`Unable to retrieve current position: ${reason}`);
    });
  }

  render() {
    return (
        <section style={{ position: 'absolute', height: '100%', width: '100%' }}>
          <GoogleMapLoader
            containerElement={ <div style={{ height: '100%' }} /> }
            googleMapElement={
              <GoogleMap defaultZoom={12} center={this.state.center} />
            }
          />
        </section>
      );
  }
}

export default WorldMap;
