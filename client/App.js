import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, SafeAreaView, ScrollView, ActivityIndicator, Image } from 'react-native';
import SearchBar from "./src/components/SearchBar";

import SomeComponent from './src/SomeComponent';
import React, { useState, useEffect } from 'react';
import NotificationClient from "./NotificationHandler";
import LocationStatusHandler from './src/LocationHandler';
// import WaterSourceMap from './src/components/WaterSourceMap';

export default function App() {

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const loadApp = async () => {
            // Simulate loading or fetching of data (e.g., from backend)
            await new Promise(resolve => setTimeout(resolve, 3000));
            setIsLoading(false); // After 3 seconds, stop loading and show the main app
        };

        loadApp();
    }, []);

    if (isLoading) {
        // Show landing page while loading
        return (
            <SafeAreaView style={styles.landingContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.logoText}>S   P </Text>
                    <View style={styles.logoOverlayContainer}>
                        {/* This view wraps both the logo and the "O" */}
                        <Image
                            source={require('./assets/landingicon.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.oText}> O </Text>
                    </View>
                    <Text style={styles.logoText}> T   T   Y</Text>
                </View>
                <StatusBar style="auto" />
            </SafeAreaView>
        );
    }

    return (

        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.h1}> S  P  O  T  T  Y</Text> */}
            <SearchBar />
            <ScrollView style={styles.scrollView}>
                <View style={styles.image_container}>
                    <Image
                        source={require('./assets/lake-serene.jpeg')} // Replace with your image URL
                        style={styles.image}
                    />
                </View>
                <View style={styles.caption_container}>
                    <Text style={styles.caption}>Lake Serene</Text>
                    <Text style={styles.description}>20 miles away</Text>
                </View>
                <View style={styles.image_container}>
                    <Image
                        source={require('./assets/grand-canyon.jpeg')} // Replace with your image URL
                        style={styles.image}
                    />
                </View>

                <View style={styles.caption_container}>
                    <Text style={styles.caption}>Grand Canyon</Text>
                    <Text style={styles.description}>50+ miles away</Text>
                </View>

                <View style={styles.image_container}>
                    <Image
                        source={require('./assets/mont-blanc.jpeg')} // Replace with your image URL
                        style={styles.image}
                    />
                </View>
                <View style={styles.caption_container}>
                    <Text style={styles.caption}>Tour du Mont Blanc</Text>
                    <Text style={styles.description}>100+ miles away</Text>
                </View>
            </ScrollView>
            <NotificationClient />
            <LocationStatusHandler />
            {/* <WaterSourceMap/> */}
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    landingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0BB243', // Green background color
    },
    textContainer: {
        flexDirection: 'row', // Aligns the text and logo horizontally
        alignItems: 'center',
    },
    logoText: {
        fontSize: 40,
        fontFamily: 'Roboto',
        color: '#000',
        fontWeight: 'bold', // Bold text for SPOTTY
    },
    logoOverlayContainer: {
        position: 'relative', // Allows the logo to overlap the "O"
        justifyContent: 'center',
        alignItems: 'center',
        width: 50, // Adjust width to fit the logo and "O"
        height: 50, // Adjust height to fit the logo and "O"
    },
    logo: {
        position: 'absolute', // Absolute positioning to overlay on top of "O"
        width: 40, // Adjust width to match the size of the "O"
        height: 40, // Adjust height to match the size of the "O"
        top: -25, // Fine-tune vertical positioning of the logo
    },
    oText: {
        fontSize: 40,
        fontFamily: 'Roboto',
        color: '#000',
        fontWeight: 'bold', // Bold "O" to match the rest of the text
    },
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    scrollView: {
        marginHorizontal: 20,
    },
    text: {
        fontSize: 20,
        textAlignVertical: "center",
        font: 'Consolata',
        justifyContent: "center"
    },
    h1: {
        fontSize: 40,
        align: "center",
        font: 'Consolata',
        justifyContent: "center",
        textAlign: "center",
    },
    image: {
        width: 350,             // Set the width of the image
        height: 160,            // Set the height of the image
        borderRadius: 20,       // Half the width/height to create rounded edges
        marginBottom: 10,       // Space between image and text
    },
    caption: {
        fontSize: 20,
        font: 'Consolata',
    },
    image_container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    description: {
        fontSize: 15,
        font: 'Consolata',
        color: '#787878'
    },
    caption_container: {
        alignSelf: 'flex-start',   // Aligns text to the left of the image
        marginLeft: 20,
    }
});



