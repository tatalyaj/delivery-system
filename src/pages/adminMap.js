import React from "react";
// import GoogleMapReact from "google-map-react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const API_KEY = "AIzaSyAxpENORc-fSayGHWY-gbKeI8lH2sqeG1A";

export default class AdminMap extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      containerStyle: {
        width: "100%",
        height: "100vh",
      },

      center: {
        lat: 10.99835602,
        lng: 77.01502627,
      },
      zoom: 11,
    };
  }

  render() {
    return (
      <div>
        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap
            mapContainerStyle={this.state.containerStyle}
            center={this.state.center}
            zoom={this.state.zoom}
          ></GoogleMap>
        </LoadScript>
      </div>
    );
  }
}
