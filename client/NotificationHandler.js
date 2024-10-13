import {Alert, Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useState, useEffect} from "react";
import {getDeviceLocation} from "./src/LocationHandler";

const NotificationClient = () => {
    // FOR THE PURPOSE OF DEMO: isToggled is true
    const [isToggled, setIsToggled] = useState(true);
    const [notificationData, setNotificationData] = useState(null);
    const [notificationCount, setNotificationCount] = useState(0); // Counter for notifications
    const [notificationTimestamps, setNotificationTimestamps] = useState([]); // Store timestamps
    const [deviceLocation, setDeviceLocation] = useState(null);

    useEffect(() => {
        // Connect to WebSocket server
        const ws = new WebSocket('ws://localhost:8080'); // Replace with your server IP

        // When WebSocket receives a message
        ws.onmessage = (event) => {
            const data = JSON.parse(event.notification);
            console.log('Notification received:', data);
            if (typeof (data.type) != "string") {
                setNotificationData('error retrieving notification');
                return;
            }
            if (data.type !== "org.camaraproject.device-status.v0.connectivity-data" ||
            data.type !== "org.camaraproject.device-status.v0.connectivity-disconnected") {
                return;
            }
            setNotificationData(data.type);
            handleNotification(data);
        };
        // Clean up WebSocket connection when component unmounts
        return () => ws.close;
    }, []);

    const handleNotification = (data) => {

        const currentTime = new Date().getTime(); // Current timestamp

        // Update timestamps and filter out old timestamps (older than 5 minutes)
        setNotificationTimestamps(prevTimestamps => {
            const newTimestamps = [...prevTimestamps, currentTime];

            // Remove timestamps older than 5 minutes (300000 ms)
            return newTimestamps.filter(timestamp => currentTime - timestamp <= 900000);
        });


        // check if there was more than 5 within 15 minutes
        if (notificationTimestamps.length >= 6) {
            Alert.alert('', 'Our system has detected an unstable connection. Would you like to ' +
                'send a message to friends or family with your location?', [
                {
                    text: 'No Thanks',
                    onPress: () => console.log('Cancel Pressed'),
                },
                {text: 'OK', onPress: () => {
                        // calls location retrieval to get the user's location
                        //     const message = `Hi! I'm at this location: ${userLocation}.`;
                        const locationData =  getDeviceLocation();
                        const message = `Hi! My connection is spotty but I'm currently ` +
                            `at this location: ${locationData.latitude}, ${locationData.longitude}.`;
                        const url = `sms:?body=${encodeURIComponent(message)}`;

                        // Open the Messages app with the pre-filled message
                        Linking.openURL(url)
                            .catch(err => console.error('Error opening SMS app:', err));
                    },
                },
            ]);
        }
        else {
            // Check if the count exceeds 3 within 5 minutes
            if (notificationTimestamps.length >= 3) {
                setNotificationCount(prevCount => prevCount + 1);
                Alert.alert('Be careful! Your connection is spotty');
            } else {
                setIsToggled(prev => !prev);
                const notificationType = (notificationData === "org.camaraproject.device-status.v0.connectivity-data"
                    ? "You've regained connection" : "You've lost connection!");
                Alert.alert(notificationType);
                setNotificationCount(prevCount => prevCount + 1); // Increment the notification count
            }
        }
    };

    // FOR THE PURPOSE OF DEMO:
    const getLocation = async () => {
        try {
            // Fetch the location before showing the alert
            const location = await getDeviceLocation();

            if (location.error || location === undefined) {
                console.error('Error fetching location:', location.error);
                setDeviceLocation({latitude: "undefined", longitude: "undefined"})
            } else {
                // Now show the alert with the fetched location data
                setDeviceLocation(location);
            }
        } catch (error) {
            console.error('Error:', error);
            setDeviceLocation({latitude: "undefined", longitude: "undefined"})
        }
    };
    // Function to add timestamp when button is clicked
    const addNotificationTimestamp = (timestamp) => {
        setNotificationTimestamps(prevTimestamps => {
            const newTimestamps = [...prevTimestamps, timestamp];
            // Remove timestamps older than 15 minutes (900000 ms)
            return newTimestamps.filter(ts => new Date().getTime() - ts <= 900000);
        });

        setIsToggled(prev => !prev);

        if (notificationTimestamps.length >= 5) {
            Alert.alert('','Our system has detected an unstable connection. Would you like to ' +
                'send a message to friends or family with your location?',  [
                {
                    text: 'No Thanks',
                    onPress: () => console.log('Cancel Pressed'),
                },
                {text: 'OK', onPress: () => {
                        // calls location retrieval to get the user's location
                        void getLocation();

                        // theoretically should get the latitude and longitude but there need to be more null checks
                        // const message = `Hi! My connection is spotty but I'm currently at this location: 123.34985, 46.49382.`;
                        const message = `Hi! My connection is spotty but I'm currently at this location: ${deviceLocation.latitude}, ${deviceLocation.longitude}.`;
                        const url = `sms:?body=${encodeURIComponent(message)}`;

                        // Open the Messages app with the pre-filled message
                        Linking.openURL(url)
                            .catch(err => console.error('Error opening SMS app:', err));

                    },
                },
            ]);
            notificationTimestamps.length = 1;
        }
        else {
            // Check if the count exceeds 3 within 5 minutes
            if (notificationTimestamps.length === 3) { // Already 2 in timestamps array, this makes it 3
                setNotificationCount(prevCount => prevCount + 1);
                Alert.alert('Be careful! Your connection is spotty');
            } else if (notificationTimestamps.length <= 3){
                const notificationType = (isToggled ? "You've lost connection :(" : "You've regained connection!!");
                // Optionally show an alert to the user
                Alert.alert(notificationType);
            }
        }
    };
    // NotificationButton component defined within the same file
    const NotificationButton = ({ onAddTimestamp }) => {
        const handlePress = () => {
            const currentTime = new Date().getTime(); // Get the current timestamp
            onAddTimestamp(currentTime); // Call the parent function to add the timestamp
        };

        return (
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Simulate Multiple Notifications</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style = {styles.h1}>Find out if you're connected...</Text>
            {notificationData && (
                <View>
                    <Text>Here is your network connection information:</Text>
                    <Text>{JSON.stringify(notificationData)}</Text>
                </View>
            )}
            <NotificationButton onAddTimestamp={addNotificationTimestamp} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',  // Center the content
        alignItems: 'center',      // Align items in the center
    },
    button: {
        backgroundColor: '#0BB243', // Button color
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#fff', // Button text color
        fontSize: 20,
    },
    h1: {
        fontSize: 40,
        align: "center",
        font: 'Consolata',
        justifyContent: "center",
        textAlign: "center",
    },
});

export default NotificationClient;