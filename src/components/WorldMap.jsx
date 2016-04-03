import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import { default as MarkerClusterer } from 'react-google-maps/lib/addons/MarkerClusterer';

import BaseComponent from './common/BaseComponent';

class WorldMap extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
    };
  }

  componentWillMount() {
    this.setState({
      center: {
        lat: this.props.user.location.coordinates[1],
        lng: this.props.user.location.coordinates[0],
      },
    });
  }

  render() {
    return (
        <section style={{ position: 'absolute', height: '100%', width: '100%' }}>
          <GoogleMapLoader
            containerElement={ <div style={{ height: '100%' }} /> }
            googleMapElement={
              <GoogleMap defaultZoom={12} center={this.state.center}>
                <Marker
                  icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  position={this.state.center}
                  title="Your position"
                />
                <MarkerClusterer averageCenter enableRetinaIcons gridSize={ 60 } >
                  {this.props.users.map(user => {
                    if (user.location.coordinates[0] !== 0.0
                      & user.location.coordinates[1] !== 0.0) {
                      return (<Marker
                        position={{ lat: user.location.coordinates[1],
                          lng: user.location.coordinates[0] }}
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
