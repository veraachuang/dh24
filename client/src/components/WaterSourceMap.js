import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import apiService from '../apiService';
import useOfflineMap from '../useOfflineMap';
Mapbox.setAccessToken('sk.eyJ1IjoidXctb3NjaGVpbCIsImEiOiJjbTI3OTVuMWkwaTF6Mm5wdjdyYzAwbjBwIn0.7tYKLUISy3vTvZkPNdBwBg');

const WaterSourceMap = () => {
    const [region, setRegion] = useState(null);
    const [waterSources, setWaterSources] = useState([]);

    // Hook to download and manage offline map
    useOfflineMap(region);

    useEffect(() => {
        const fetchWaterSources = async () => {
            try {
                const { latitude, longitude } = await getCurrentLocation();
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });

                // Fetch water source data from backend
                const sources = await apiService.getWaterSources(latitude, longitude);
                setWaterSources(sources);
            } catch (error) {
                console.error('Error fetching water sources:', error);
            }
        };

        fetchWaterSources();
    }, []);

    return (
        <View style={styles.container}>
            {region && (
                <Mapbox.MapView
                    style={styles.map}
                    styleURL={MapboxGL.StyleURL.Street}
                    zoomLevel={14}
                    centerCoordinate={[region.longitude, region.latitude]}
                    showUserLocation={true}
                >
                    {waterSources.map(source => (
                        <Mapbox.MarkerView
                            key={source.name}
                            coordinate={[source.coordinates.lon, source.coordinates.lat]}
                            title={source.name}
                            description={`Distance: ${source.distance.toFixed(2)} km`}
                        />
                    ))}
                </Mapbox.MapView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default WaterSourceMap;
