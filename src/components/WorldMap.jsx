import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import { default as MarkerClusterer } from 'react-google-maps/lib/addons/MarkerClusterer';

import BaseComponent from './common/BaseComponent';


// TODO: Use user profile geolocation (retrieved in App.jsx) instead of another call to geolocation
const geolocation = (
  navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure('Your browser doesn\'t support geolocation.');
    },
  }
);

class WorldMap extends BaseComponent {
  constructor(props) {
    super(props);
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
        <section style={{ position: 'absolute', height: '95%', width: '100%' }}>
          <GoogleMapLoader
            containerElement={ <div style={{ height: '100%' }} /> }
            googleMapElement={
              <GoogleMap defaultZoom={12} center={this.state.center}>
                <MarkerClusterer averageCenter enableRetinaIcons gridSize={ 60 } >
                  {this.props.users.map(user => {
                    if (user.latitude && user.longitude) {
                      return (<Marker
                        position={{ lat: user.latitude, lng: user.longitude }}
                        key={ user.user_id }
                      />);
                    }
                    return false;
                  })}
                </MarkerClusterer>
              </GoogleMap>
            }
          />
        </section>
      );
  }
}

export default WorldMap;
