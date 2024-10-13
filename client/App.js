import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, SafeAreaView, ScrollView, ActivityIndicator, Image } from 'react-native';
import SomeComponent from './src/SomeComponent';
import React, { useState, useEffect } from 'react';
import NotificationClient from "./NotificationHandler";
import LocationStatusHandler from './src/LocationHandler';

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
            <Text style={styles.h1}> S  P  O  T  T  Y</Text>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.text}>Have fun on your backpacking trip!</Text>
                <StatusBar style="auto" />
                <NotificationClient />
                <LocationStatusHandler/>
            </ScrollView>
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
        paddingTop: StatusBar.currentHeight || 0,
        backgroundColor: '#fff',
    },
    scrollView: {
        marginHorizontal: 20,
    },
    text: {
        fontSize: 20,
        textAlignVertical: "center",
        font: 'Roboto',
        justifyContent: "center"
    },
    h1: {
        fontSize: 40,
        align: "center",
        font: 'Roboto',
        justifyContent: "center",
        textAlign: "center",
    }
});



