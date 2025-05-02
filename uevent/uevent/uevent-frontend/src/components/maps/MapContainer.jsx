import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


class MapContainer extends Component {
    state = {
        markerPosition: null
    };

    setMarkerPosition = (mapProps, map, clickEvent) => {
        const newPosition = {
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng()
        };

        this.props.onMarkerPositionChange(newPosition);

        this.setState({
            markerPosition: newPosition
        });
    };

    render() {
        const { markerPosition } = this.state;
        return (
            <Map
                google={this.props.google}
                zoom={14}
                initialCenter={{
                    lat: 37.774929,
                    lng: -122.419416
                }}
                onClick={this.setMarkerPosition}
            >
                {markerPosition && <Marker position={markerPosition} />}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCt4UD4VNqSNqw6PsLylVRfde6IpDyalSU'
})(MapContainer);