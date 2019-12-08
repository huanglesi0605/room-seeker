// google map used to display house address

import React from "react";
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap
} from "react-google-maps";

class RoomMap extends React.Component {
  render() {
    const googleMapsClient = require("@google/maps").createClient({
      key: "AIzaSyAyPIYfPAg4Kqm-LvaLjMHJP09xOQGyiFk"
    });

    googleMapsClient.geocode(
      {
        address: this.props.roomAddress
      },
      function(err, response) {
        if (!err) {
          console.log(response.json.results[0]);

          const lat = response.json.results[0].geometry.location.lat;

          const lng = response.json.results[0].geometry.location.lng;

          localStorage.clear();

          localStorage.setItem("justLat", lat);

          localStorage.setItem("justLng", lng);
        }
      }
    );

    const roomLat = parseFloat(localStorage.getItem("justLat"));

    const roomLng = parseFloat(localStorage.getItem("justLng"));

    function Map() {
      return (
        <GoogleMap
          defaultZoom={15}
          defaultCenter={{ lat: roomLat, lng: roomLng }}
        >
          <Marker position={{ lat: roomLat, lng: roomLng }} />
        </GoogleMap>
      );
    }

    const WrappedMap = withScriptjs(withGoogleMap(Map));

    const apiKey = "AIzaSyAyPIYfPAg4Kqm-LvaLjMHJP09xOQGyiFk";

    return (
      <div style={{ width: "50vw", height: "50vh" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          isMarkerShown
        />
      </div>
    );
  }
}

export default RoomMap;
