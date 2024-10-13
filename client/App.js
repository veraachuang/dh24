import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, SafeAreaView, ScrollView, Image } from 'react-native';
import SomeComponent from './src/SomeComponent';
import React, { useState, useEffect } from 'react';
import NotificationClient from "./NotificationHandler";
import LocationStatusHandler from "./src/LocationHandler";
import SearchBar from "./src/components/SearchBar";

export default function App() {
  return (

    <SafeAreaView style={styles.container}>
        {/*<Text style = {styles.h1}> S  P  O  T  T  Y</Text>*/}
        <SearchBar />
        <ScrollView style = {styles.scrollView}>

            <View style={styles.image_container}>
                <Image
                    source={require('./assets/lake-serene.jpeg')} // Replace with your image URL
                    style={styles.image}
                />
            </View>
            <View style = {styles.caption_container}>
                <Text style={styles.caption}>Lake Serene</Text>
                <Text style={styles.description}>20 miles away</Text>
            </View>

            <View style={styles.image_container}>
                <Image
                    source={require('./assets/grand-canyon.jpeg')} // Replace with your image URL
                    style={styles.image}
                />
            </View>
            <View style = {styles.caption_container}>
                <Text style={styles.caption}>Grand Canyon</Text>
                <Text style={styles.description}>50+ miles away</Text>
            </View>

            <View style={styles.image_container}>
                <Image
                    source={require('./assets/mont-blanc.jpeg')} // Replace with your image URL
                    style={styles.image}
                />
            </View>
            <View style = {styles.caption_container}>
                <Text style={styles.caption}>Tour du Mont Blanc</Text>
                <Text style={styles.description}>100+ miles away</Text>
            </View>
        </ScrollView>
        <LocationStatusHandler/>
        <NotificationClient />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    scrollView: {
        backgroundColor: 'light-blue',
        marginHorizontal: 20,
    },
    text: {
        fontSize: 20,
        textAlignVertical: "center",
        font: 'Consolata',
    },
    h1: {
        fontSize: 40,
        font: 'Consolata',
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



