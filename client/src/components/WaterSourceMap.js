import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
//import MapboxGL from '@rnmapbox/maps';
import apiService from '../apiService';
import useOfflineMap from '../useOfflineMap';
import { myDevice } from '../routes';

// const WaterSourceMap = () => {
//     const [region, setRegion] = useState(null);
//     const [waterSources, setWaterSources] = useState([]);

//     // Hook to download and manage offline map
//     useOfflineMap(region);

//     useEffect(() => {
//         const fetchWaterSources = async () => {
//             try {
//                 const { latitude, longitude } = await getCurrentLocation();
//                 setRegion({
//                     latitude,
//                     longitude,
//                     latitudeDelta: 0.01,
//                     longitudeDelta: 0.01,
//                 });

//                 // Fetch water source data from backend
//                 const sources = await apiService.getWaterSources(latitude, longitude);
//                 setWaterSources(sources);
//             } catch (error) {
//                 console.error('Error fetching water sources:', error);
//             }
//         };

//         fetchWaterSources();
//     }, []);

//     return (
//         <View style={styles.container}>
//             {region && (
//                 <MapboxGL.MapView
//                     style={styles.map}
//                     styleURL={MapboxGL.StyleURL.Street}
//                     zoomLevel={14}
//                     centerCoordinate={[region.longitude, region.latitude]}
//                     showUserLocation={true}
//                 >
//                     {waterSources.map(source => (
//                         <MapboxGL.MarkerView
//                             key={source.name}
//                             coordinate={[source.coordinates.lon, source.coordinates.lat]}
//                             title={source.name}
//                             description={`Distance: ${source.distance.toFixed(2)} km`}
//                         />
//                     ))}
//                 </MapboxGL.MapView>
//             )}
//         </View>
//     );
// };

const WaterFromEPA = async (latitude, longtitude) => {
    const apiKey = 'MRrxVk1gPgOuJIPSMVOorQj7VPguGrjKqHyDcsIZ';
    const endpoint = `https://enviro.epa.gov/enviro/efservice/get_facilities/?latitude=${latitude}&longitude=${longitude}&media=Water&radius=10&API_KEY=${apiKey}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.map(source => ({
            name: source.FACILITY_NAME,
            coordinates: {
                lat: source.FACILITY_LATITUDE,
                lon: source.FACILITY_LONGITUDE,
            },
            distance: source.DISTANCE, // Assuming distance is included in the response
        }));
    } catch (error) {
        console.error('Error fetching water sources from EPA:', error);
        return [];
    }
};

const getCurrentLocation = async () => {
    try {
        const connectivityStatus = await myDevice.getConnectivity();

        if (connectivityStatus && connectivityStatus.latitude && connectivityStatus.longitude) {
            const { latitude, longitude } = connectivityStatus;
            return { latitude, longitude };
        } else {
            throw new Error('Location data not available');
        }
    } catch (error) {
        console.error('Error fetching location:', error);
        throw error;
    }
};
const WaterSourceList = () => {
    const [waterSources, setWaterSources] = useState([]);
    const [region, setRegion] = useState(null);

    useEffect(() => {
        const fetchWaterSources = async () => {
            try {
                // Assuming you have a function to get the current location
                const { latitude, longitude } = await getCurrentLocation(); 
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });

                // Fetch water source data from the US EPA API
                const sources = await fetchWaterSourcesFromEPA(latitude, longitude);
                setWaterSources(sources);
            } catch (error) {
                console.error('Error fetching water sources:', error);
            }
        };

        fetchWaterSources();
    }, []);


    return (
        <View style={styles.container}>
            {region ? (
                <FlatList
                    data={waterSources}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={styles.sourceContainer}>
                            <Text style={styles.sourceName}>{item.name}</Text>
                            <Text style={styles.sourceDetails}>
                                Latitude: {item.coordinates.lat}, Longitude: {item.coordinates.lon}
                            </Text>
                            <Text style={styles.sourceDetails}>
                                Distance: {item.distance ? item.distance.toFixed(2) : 'N/A'} km
                            </Text>
                        </View>
                    )}
                />
            ) : (
                <Text>Fetching your location...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    sourceContainer: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
    },
    sourceName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sourceDetails: {
        fontSize: 14,
        marginTop: 4,
    },
});

export default WaterSourceList;


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
// });

// export default WaterSourceMap;
