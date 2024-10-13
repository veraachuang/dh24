import {useState} from "react";
import {Button, View, StyleSheet, Text} from "react-native";

export const getDeviceLocation = async () => {
    try {
        const response = await fetch(`https://localhost:8088/device-location`);
        const data = await response.json();
        return { latitude: data.latitude, longitude: data.longitude };
    } catch (error) {
        console.error('Error fetching device location:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};

const LocationStatusHandler = () => {
    const [deviceLocation, setDeviceLocation] = useState(null);
    const [locationStatus, setLocationStatus] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFetchLocation = async () => {
        setLoading(true);
        try {
            // const locationData = await getDeviceLocation(); // Use the external function
            if (locationData !== undefined) {
                setDeviceLocation(locationData); // Set the device location in the state
                findDistance(deviceLocation.latitude, deviceLocation.longitude);
            }
            //setDeviceLocation({latitude: 142.2598, longitude:23.23498});
            //findDistance(142.2598, 23.23498);
        } catch (error) {
            console.error('Error fetching device location:', error);
        } finally {
            setLoading(false);
        }
    };

    const findDistance = (lat1, long1) => {
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371; // Earth radius in kilometers
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in kilometers
        };

        const cityCenter = { latitude: 47.6062, longitude: -122.3321 };

        const distanceFromCityCenter = calculateDistance(
            lat1,
            long1,
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
    }


    return (
        <View style = {styles.container}>
            <View>
                <Text style = {styles.h1}>
                    Find out where you are!
                </Text>
            </View>
            <Button title="Get Your Location" onPress={handleFetchLocation} />
            {loading ? (
                <Text>Loading...</Text>
            ) : deviceLocation ? (
                <Text style = {styles.h2}>
                    Latitude: {deviceLocation.latitude}, Longitude: {deviceLocation.longitude}
                </Text>
            ) : (
                <Text>No location data available</Text>
            )}
            {locationStatus ? (
                    <Text style={styles.h2}>{locationStatus}</Text>
                ) :
                <Text style={styles.h2}></Text>}
        </View>
    );

}
//     const [locationStatus, setLocationStatus] = useState(null);
//     const [errorMsg, setErrorMsg] = useState(null);
//
//     useEffect(() => {
//         // WebSocket connection to the backend
//         const socket = new WebSocket('ws://localhost:8080'); // Use your backend WebSocket URL here
//
//         socket.onopen = () => {
//             console.log('WebSocket connection established');
//         };
//
//         socket.onmessage = (event) => {
//             const { latitude, longitude } = JSON.parse(event.data).location;
//             const cityCenter = { latitude: 47.6062, longitude: -122.3321 }; // Seattle city center coordinates
//
//             // Calculate the distance in kilometers
//             const distanceFromCityCenter = calculateDistance(
//                 latitude,
//                 longitude,
//                 cityCenter.latitude,
//                 cityCenter.longitude
//             );
//
//             const distanceInMiles = distanceFromCityCenter * 0.621371; // Convert kilometers to miles
//
//             // Check if the distance is within 1 mile
//             if (distanceInMiles <= 1) {
//                 setLocationStatus("City is near (within 1 mile)");
//             } else {
//                 setLocationStatus(`City is ${distanceInMiles.toFixed(2)} miles away`);
//             }
//         };
//
//         socket.onerror = (error) => {
//             console.error('WebSocket error:', error);
//             setErrorMsg('Failed to connect to the server');
//         };
//
//         socket.onclose = () => {
//             console.log('WebSocket connection closed');
//         };
//
//         // Cleanup WebSocket connection when the component unmounts
//         return () => {
//             socket.close();
//         };
//     }, []);
//
//     return (
//         <View style={styles.container}>
//             {locationStatus ? (
//                 <Text style={{ fontSize: 18 }}>{locationStatus}</Text>
//             ) : (
//                 <Text style={{ fontSize: 18 }}>Fetching location...</Text>
//             )}
//             {errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
//         </View>
//     );
// };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',  // Center the content
        alignItems: 'center',      // Align items in the center
    },
    h1: {
        fontSize: 40,
        align: "center",
        font: 'Consolata',
        justifyContent: "center",
        textAlign: "center",
    },
    h2: {
        fontSize: 20,
        marginTop: 10,
        align: "center",
        font: 'Consolata',
        justifyContent: "center",
        textAlign: "center",
    },
});

export default LocationStatusHandler;