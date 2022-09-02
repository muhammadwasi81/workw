import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
      const key = "AIzaSyBWf41rAL3mpx4L_FMQQzg21KF1p8g6mzk"
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '350px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`, }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
            {/* https://maps.googleapis.com/maps/api/js?key=AIzaSyBWf41rAL3mpx4L_FMQQzg21KF1p8g6mzk */}
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;