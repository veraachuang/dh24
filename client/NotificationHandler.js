import {Alert, Text, View} from "react-native";
import {useState, useEffect} from "react";

const NotificationClient = () => {
    const [isToggled, setIsToggled] = useState(false);
    const [notificationData, setNotificationData] = useState(null);
    const [notificationCount, setNotificationCount] = useState(0); // Counter for notifications
    const [notificationTimestamps, setNotificationTimestamps] = useState([]); // Store timestamps

    useEffect(() => {
        // Connect to WebSocket server
        const ws = new WebSocket('ws://localhost:8080'); // Replace with your server IP

        // When WebSocket receives a message
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Notification received:', data);
            handleNotification(data.notification);
        };
        // Clean up WebSocket connection when component unmounts
        return () => ws.close;
    }, []);

    const handleNotification = (data) => {
        if (typeof (data.type) != "string") {
            setNotificationData('error retrieving notification');
            return;
        }
        const currentTime = new Date().getTime(); // Current timestamp

        // Update timestamps and filter out old timestamps (older than 5 minutes)
        setNotificationTimestamps(prevTimestamps => {
            const newTimestamps = [...prevTimestamps, currentTime];

            // Remove timestamps older than 5 minutes (300000 ms)
            return newTimestamps.filter(timestamp => currentTime - timestamp <= 900000);
        });

        // check if there was more than 5 within 15 minutes
        if (notificationTimestamps.length >= 5) {
            // Alert.alert('Our system has detected the connection in this area is spotty. Would you like to ' +
                // 'send a message to friends or family with your location?');
            Alert.alert('', 'Our system has detected the connection in this area is spotty. Would you like to ' +
                'send a message to friends or family with your location?', [
                {
                    text: 'No Thanks',
                    onPress: () => console.log('Cancel Pressed'),
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
            // for purposes of testing
            // notificationTimestamps.length = 1;
        }
        else {
            // Check if the count exceeds 3 within 5 minutes
            if (notificationTimestamps.length >= 3) {
                setNotificationCount(prevCount => prevCount + 1);
                Alert.alert('Be careful! Your connection is unstable');
            } else {
                setIsToggled(prev => !prev); // Toggle the state when a notification is received
                setNotificationData(data.type);
                const notificationType = (notificationData === "org.camaraproject.device-status.v0.connectivity-data"
                    ? "You've lost connection!" : "You've regained connection");
                // Optionally show an alert to the user
                Alert.alert(notificationType);
                setNotificationCount(prevCount => prevCount + 1); // Increment the notification count
            }
        }
    };

    return (
        <View style={{ padding: 40 }}>
            {notificationData && (
                <View>
                    <Text>Here is your network connection information:</Text>
                    <Text>{JSON.stringify(notificationData)}</Text>
                </View>
            )}
        </View>
    );
};

export default NotificationClient;