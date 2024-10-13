import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, SafeAreaView, ScrollView } from 'react-native';
import SomeComponent from './src/SomeComponent';
import React, { useState, useEffect } from 'react';
import NotificationClient from "./NotificationHandler";
import LocationStatusHandler from "./src/LocationHandler";

export default function App() {
  return (

    <SafeAreaView style={styles.container}>
        <Text style = {styles.h1}> S  P  O  T  T  Y</Text>
        <ScrollView style = {styles.scrollView}>

            <View style={styles.container}>
                <Image
                    source={require('./assets/grand-canyon.jpeg')} // Replace with your image URL
                    style={styles.image}
                />
                <Text style={styles.caption}>Grand Canyon</Text>
            </View>

            <Text style = {styles.text}>Have fun on your backpacking trip!</Text>
             <StatusBar style="auto" />

            <LocationStatusHandler/>
            <NotificationClient />
        </ScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: 'light-blue',
        marginHorizontal: 20,
    },
    text: {
        fontSize: 20,
        textAlignVertical: "center",
        font: 'Roboto',
    },
    h1: {
        fontSize: 40,
        align: "center",
        font: 'Roboto',
        justifyContent: "center",
        textAlign: "center",
    },
    image: {
        width: 150,             // Set the width of the image
        height: 150,            // Set the height of the image
        borderRadius: 75,       // Half the width/height to create rounded edges
        marginBottom: 10,       // Space between image and text
    },
    caption: {
        fontSize: 20,
    },
});



