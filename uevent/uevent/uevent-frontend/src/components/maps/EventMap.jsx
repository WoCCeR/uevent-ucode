import React from 'react';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';

const EventMap = ({ event, google }) => {
    const renderMarker = () => {
        if (event && event.latitude && event.longitude) {
            return <Marker position={{ lat: event.latitude, lng: event.longitude }} />;
        }
        return null;
    };

    return (
        <Map
            zoom={14}
            initialCenter={{ lat: event.latitude, lng: event.longitude }}
            google={google}>
            {renderMarker()}
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCt4UD4VNqSNqw6PsLylVRfde6IpDyalSU'
})(EventMap);