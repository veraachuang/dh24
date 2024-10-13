import React, { useEffect, useState } from 'react';
import {View, Text, Button} from 'react-native';
import { WebSocket } from 'ws'; // For WebSocket connection

const LocationStatusHandler = () =>  {
    const [locationStatus, setLocationStatus] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        // WebSocket connection to the backend
        const ws = new WebSocket('ws://localhost:8080'); // Use your backend WebSocket URL here

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const { latitude, longitude } = JSON.parse(event.data).location;
            const cityCenter = { latitude: 47.6062, longitude: -122.3321 }; // Seattle city center coordinates

            // Calculate the distance in kilometers
            const distanceFromCityCenter = calculateDistance(
                latitude,
                longitude,
                cityCenter.latitude,
                cityCenter.longitude
            );

            const distanceInMiles = distanceFromCityCenter * 0.621371; // Convert kilometers to miles


            // Check if the distance is within 1 mile
            if (distanceInMiles <= 1) {
                setLocationStatus("City is near (within 1 mile)");
            } else {
                setLocationStatus(`City is ${distanceInMiles.toFixed(2)} miles away`);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setErrorMsg('Failed to connect to the server');
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Cleanup WebSocket connection when the component unmounts
        return () => {
            ws.close();
        };
    }, []);


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                title="Distance to closest city"
                onPress={() => setLocationStatus("City is near (within 1 mile)")}
            />
            {locationStatus ? (
                <Text style={{ fontSize: 18 }}>{locationStatus}</Text>
            ) : (
                <Text style={{ fontSize: 18 }}>Fetching location...</Text>
            )}
            {errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
        </View>
    );
}

export default LocationStatusHandler;