import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import LocationStatusHandler from './src/LocationHandler';

export default function App() {
  return (

    <SafeAreaView style={styles.container}>
        <Text style = {styles.h1}> S  P  O  T  T  Y</Text>
        <ScrollView style = {styles.scrollView}>
            <Text style = {styles.text}>Have fun on your backpacking trip!</Text>
             <StatusBar style="auto" />
            <LocationStatusHandler/>
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