import React from 'react';
import $ from 'jquery';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

import BaseComponent from './common/BaseComponent';

const fnames = ['Bertrand', 'Enzo', 'Joe', 'Johny',
'Bobby', 'Jack', 'Edouardo', 'Sanchez', 'Julia',
'Maria', 'Lucy', 'Marion', 'Georges', 'Brad', 'Phil',
'Thomas', 'Claudia', 'Nicolas', 'Benoit', 'Monir',
'Youssef', 'Bernard', 'Florence', 'Jean', 'Carmen',
'Graziella', 'Mathieu', 'Michael', 'Melissa',
'Ophélie', 'Yohann', 'Priscilla'];
const lnames = ['Ramirez', 'Veinard', 'Lapointe',
'Doe', 'Dupont', 'Mars', 'Hillary', 'Gyver', 'Magnum',
'Earley', 'Wong', 'Chan', 'Geng', 'Pora', 'Flore',
'Fleur', 'Poisson', 'Radio', 'Summu', 'Atola', 'Erich',
'Milo', 'Mimosa', 'Aladeen', 'Al Appa', 'Del Poco',
'Rich', 'Pooli', 'Powell'];
const professions = ['Designer', 'Frontend developer', 'Fullstack engineer',
'Customer Support Specialist', 'QA Engineer', 'Technical Writer',
'Marketing Generalist', 'Tech Freelance', 'Sysadmin'];

const geolocation = (
  navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure('Your browser doesn\'t support geolocation.');
    },
  }
);

class UserGeneratorMap extends BaseComponent {
  constructor(props) {
    super(props);
    this._bind('handleMapClick');
    this.state = {
      markers: [],
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

  generateUUID() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now(); // use high-precision timer if available
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  createUser(user, position) {
    $.ajax({
      url: '/api/users',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(user),
      success: function createUserSuccess() {
        console.log('User created');
        console.log(JSON.stringify(user, null, 4));
        const updatedMarkers = this.state.markers;
        updatedMarkers.push({
          position,
        });
        this.setState({
          markers: updatedMarkers,
          center: {
            lat: user.latitude,
            lng: user.longitude,
          },
        });
      }.bind(this),
      error: function createUserError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  findCityAndCreateUser(position) {
    const firstname = fnames[Math.floor(Math.random() * fnames.length)];
    const lastname = lnames[Math.floor(Math.random() * lnames.length)];
    const profession = professions[Math.floor(Math.random() * professions.length)];

    $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat()},${position.lng()}`,
      success: function findPositionSuccess(data) {
        const city = this.extractCityFromResults(data.results);
        const newUser = {
          user_id: this.generateUUID(),
          firstname,
          lastname,
          email: `${firstname}.${lastname}@awesomeprovider.com`,
          city,
          profession,
          latitude: position.lat(),
          longitude: position.lng(),
        };
        this.createUser(newUser, position);
      }.bind(this),
      error: function findPositionError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  extractCityFromResults(results) {
    const addrComponents = results[0].address_components;
    for (let i = 0; i < addrComponents.length; i++) {
      const compoTypes = addrComponents[i].types;
      for (let j = 0; j < compoTypes.length; j++) {
        if (compoTypes[j] === 'locality') {
          return addrComponents[i].long_name;
        }
      }
    }
    return 'Undefined';
  }

  handleMapClick(event) {
    const position = event.latLng;
    this.findCityAndCreateUser(position);
  }

  render() {
    return (
        <section style={{ position: 'absolute', height: '95%', width: '100%' }}>
          <GoogleMapLoader
            containerElement={ <div style={{ height: '100%' }} /> }
            googleMapElement={
              <GoogleMap defaultZoom={12} center={this.state.center} onClick={this.handleMapClick}>
                {this.state.markers.map((marker, index) =>
                  <Marker position={marker.position} key={index} />
                )}
              </GoogleMap>
            }
          />
        </section>
      );
  }
}

export default UserGeneratorMap;
