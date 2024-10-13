import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, SafeAreaView, ScrollView } from 'react-native';
import SomeComponent from './src/SomeComponent';
import React, { useState, useEffect } from 'react';
import NotificationClient from "./NotificationHandler";

export default function App() {
  return (

    <SafeAreaView style={styles.container}>
        <NotificationClient />
        <ScrollView style = {styles.scrollView}>
            <Text style = {styles.text}>Have fun on your backpacking trip!</Text>
            <StatusBar style="auto" />
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
        fontSize: 42,
        align: "center",
        font: 'Roboto',
        justifyContent: "center"
    },
});



