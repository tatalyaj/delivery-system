import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

export default class AdminMap extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      mapOptions: {
        zoom: 15,
        center: {
          lat: 31.76382,
          lng: 35.20333,
        },
      },
      containerStyle: {
        width: "100%",
        height: "100vh",
      },
    };
  }

  render() {
    return (
      <div>
        <GoogleMap
          mapContainerStyle={this.state.containerStyle}
          center={this.state.mapOptions.center}
          zoom={this.state.mapOptions.zoom}
        ></GoogleMap>
      </div>
    );
  }
}
