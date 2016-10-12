import {
  default as React,
  Component,
  PropTypes,
} from "react";
import _ from "lodash";
import canUseDOM from "can-use-dom";
import raf from "raf";
import FaSpinner from "react-icons/lib/fa/spinner";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import {FormControl} from 'react-bootstrap';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
  InfoWindow,
} from 'react-google-maps';

let gmapAPI = Meteor.settings.public.gmaps

const AsyncGettingStartedExampleGoogleMap = _.flowRight(
  withScriptjs,
  withGoogleMap,
  )(props => (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={16}
      center={props.center}
      onClick={props.onMapClick}
    >

    {props.markers.map((marker, index) => (
      <Marker
        {...marker}
        key={index}
        position={marker.position}
        onClick={()=> props.onMarkerClick(marker)}
        onRightClick={() => props.onMarkerRightClick(marker)}
      >
      {marker.showInfo && (
        <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
        <FormControl
          type="text"
          value={marker.infoContent}
          placeholder="Enter text"
          />
        </InfoWindow>
      )}
      </Marker>
    ))}

    {props.center && (
      <Circle
        center={props.center}
        radius={props.radius}
        options={{
          fillColor: `red`,
          fillOpacity: 0.20,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
    )}
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

  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);

  state = {
    center: null,
    radius: 35,
  }
  isUnmounted = false;

  componentDidMount() {
  const tick = () => {
    if (this.isUnmounted) {
      return;
    }
    this.setState({ radius: Math.max(this.state.radius - 20, 0) });

    if (this.state.radius > 200) {
      raf(tick);
    }
  };

  geolocation.getCurrentPosition((position) => {
  if (this.isUnmounted) {
    return;
  }
  this.setState({
    center: {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    },
    markers: [{
      position: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      defaultAnimation: 2,
    }],
  });

  raf(tick);
  }, (reason) => {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      center: {
        lat: 60,
        lng: 105,
      },
    });
  });
  }

  componentWillUnmount() {
  this.isUnmounted = true;
  }


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

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
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
        onMarkerClick={this.handleMarkerClick}
        onMarkerClose={this.handleMarkerClose}
        onMarkerRightClick={this.handleMarkerRightClick}
        center={this.state.center}
        radius={this.state.radius}
      />
    );
  }
}
