import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LandingPage = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulating an app initialization (e.g., fetching data or checking user status)
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate a network request or startup process
        await new Promise(resolve => setTimeout(resolve, 3000));
        // After the process, set loading to false and navigate to the Home screen
        setIsLoading(false);
        navigation.replace('Home'); // Replace with your main screen (Home in this case)
      } catch (error) {
        console.error("Initialization failed", error);
        // Handle error if needed
      }
    };

    initializeApp();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <Text style={styles.title}>Welcome to My App</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </>
      ) : (
        <Text style={styles.title}>Redirecting...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LandingPage;
