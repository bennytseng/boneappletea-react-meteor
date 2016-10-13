import _ from "lodash";

import {
  default as React,
  Component,
  PropTypes,
} from "react";

import FaSpinner from "react-icons/lib/fa/spinner";

import withScriptjs from "react-google-maps/lib/async/withScriptjs";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

let gmapAPI = Meteor.settings.public.gmaps

const AsyncGettingStartedExampleGoogleMap = _.flowRight(
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={16}
    defaultCenter={{ lat: 49.2819605, lng: -123.1086604 }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);



export default class mapApp extends Component {

  state = {
    markers: [{
      position: {
        lat: 49.2819605,
        lng: -123.1086604,
      },
      key: `CodeCore Cafe`,
      defaultAnimation: 2,
    }],
  }

  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  handleMarkerRightClick = this.handleMarkerRightClick.bind(this);

  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(),
      },
    ];
    this.setState({
      markers: nextMarkers,
    });
  }

  handleMarkerRightClick(targetMarker) {

    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

  render() {
    return (
      <AsyncGettingStartedExampleGoogleMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&key=AIzaSyCZ2bkxdQieKsrJ3GWRoHIuqO0ASpEK6Wk"
        loadingElement={
          <div style={{ height: `100%` }}>
            <FaSpinner
              style={{
                display: `block`,
                width: `80px`,
                height: `80px`,
                margin: `150px auto`,
                animation: `fa-spin 2s infinite linear`,
              }}
            />
          </div>
        }
        containerElement={
          <div style={{ height: `500px` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        onMapLoad={this.handleMapLoad}
        onMapClick={this.handleMapClick}
        markers={this.state.markers}
        onMarkerRightClick={this.handleMarkerRightClick}
      />
    );
  }
}
