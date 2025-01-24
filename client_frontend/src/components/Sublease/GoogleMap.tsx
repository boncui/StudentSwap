import React from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

//Map container style
const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 38.648987,
    lng: -90.312553,
};

const MapComponent: React.FC = () => {
    return (
        <LoadScript googleMapsApiKey={process.env.React_APP_GOOGLE_MAPS_API_KEY!}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
            >
                {/* Example Marker*/}
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent