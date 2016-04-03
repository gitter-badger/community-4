import React from 'react/lib/React';
import GoogleMapLoader from 'react-google-maps/lib/GoogleMapLoader';
import GoogleMap from 'react-google-maps/lib/GoogleMap';
import Marker from 'react-google-maps/lib/Marker';
import SearchBox from 'react-google-maps/lib/SearchBox';
import { default as MarkerClusterer } from 'react-google-maps/lib/addons/MarkerClusterer';

import BaseComponent from './common/BaseComponent';

const searchBoxInputStyle = {
  border: '1px solid transparent',
  borderRadius: '1px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  boxSizing: 'border-box',
  MozBoxSizing: 'border-box',
  fontSize: '14px',
  height: '32px',
  marginTop: '2%',
  marginLeft: '25%',
  outline: 'none',
  padding: '0 12px',
  textOverflow: 'ellipses',
  width: '400px',
};

class WorldMap extends BaseComponent {

  constructor(props) {
    super(props);
    this._bind('handlePlacesChanged');
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

  handlePlacesChanged() {
    const places = this.refs.searchBox.getPlaces();
    if (places.length === 1) {
      this.setState({
        center: places[0].geometry.location,
      });
      const geoPoint = {
        type: 'Point',
        coordinates: [
          places[0].geometry.location.lng(),
          places[0].geometry.location.lat(),
        ],
      };
      this.props.refreshPlaceCallback(geoPoint);
    }
  }

  render() {
    return (
        <section style={{ position: 'absolute', height: '100%', width: '65%' }}>
          <GoogleMapLoader
            containerElement={ <div style={{ width: '100%', height: '100%' }} /> }
            googleMapElement={
              <GoogleMap defaultZoom={12} center={this.state.center}>
                <Marker
                  icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  position={{
                    lat: this.props.user.location.coordinates[1],
                    lng: this.props.user.location.coordinates[0],
                  }}
                  title="Your position"
                />
                <SearchBox
                  controlPosition={google.maps.ControlPosition.TOP_LEFT}
                  onPlacesChanged={this.handlePlacesChanged}
                  ref="searchBox"
                  placeholder="Find people anywhere in the world..."
                  style={searchBoxInputStyle}
                />
                <MarkerClusterer averageCenter enableRetinaIcons gridSize={ 60 } >
                  {this.props.users.map(user => {
                    if (user.location.coordinates[0] !== 0.0
                      & user.location.coordinates[1] !== 0.0) {
                      return (<Marker
                        position={{ lat: user.location.coordinates[1],
                          lng: user.location.coordinates[0] }}
                        key={user.user_id}
                        title={`${user.firstname} ${user.lastname}`}
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
