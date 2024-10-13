import express from "express"
import bodyParser from 'body-parser';
import { NetworkAsCodeClient } from "network-as-code";
import { subscribeToNokiaService } from "./routes.js";
import WebSocket, { WebSocketServer } from 'ws';
import waterSourceRoutes from './waterSourceRoutes.js';  // Import water source routes


// Set up WebSocket server
const ws = new WebSocketServer({ port: 8080 }); // WebSocket server on port 8080

// Store connected WebSocket clients
let clients = [];

// WebSocket connection
wss.on('connection', (ws) => {
    clients.push(ws); // Add client to list

    ws.on('close', () => {
        // Remove client when it disconnects
        clients = clients.filter(client => client !== ws);
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

const app = express();

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

const cityCenterCoordinates = {
    latitude: 47.6062, // Example: Seattle city center
    longitude: -122.3321
};

// POST endpoint to retrieve the user's location from Nokia's API
app.post('/retrieveLocation', async(req, res) => {
    try {
        // Retrieve the connectivity status which may contain location data
        const connectivityStatus = await myDevice.getConnectivity();

        if (connectivityStatus && connectivityStatus.latitude && connectivityStatus.longitude) {
            const locationData = {
                latitude: connectivityStatus.latitude,
                longitude: connectivityStatus.longitude
            };

            res.status(200).json({
                success: true,
                location: locationData
            });
        } else {
            res.status(404).json({ success: false, message: 'Location data not available' });
        }
    } catch (error) {
        console.error('Error retrieving location:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve location' });
    }
});

// POST endpoint to verify user's location
app.post('/verifyLocation', async(req, res) => {
    try {
        // Retrieve the connectivity status which may contain location data
        const connectivityStatus = await myDevice.getConnectivity();

        if (connectivityStatus && connectivityStatus.latitude && connectivityStatus.longitude) {
            const userLatitude = connectivityStatus.latitude;
            const userLongitude = connectivityStatus.longitude;

            // Calculate the distance between the user's location and the city center
            const distanceFromCityCenter = calculateDistance(
                userLatitude,
                userLongitude,
                cityCenterCoordinates.latitude,
                cityCenterCoordinates.longitude
            );

            const maxAllowedDistance = 10; // 10 km radius for verification

            if (distanceFromCityCenter <= maxAllowedDistance) {
                res.status(200).json({
                    success: true,
                    message: `User is within ${distanceFromCityCenter.toFixed(2)} km of the city center`,
                    verified: true
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: `User is ${distanceFromCityCenter.toFixed(2)} km away from the city center`,
                    verified: false
                });
            }
        } else {
            res.status(404).json({ success: false, message: 'Location data not available' });
        }
    } catch (error) {
        console.error('Error verifying location:', error);
        res.status(500).json({ success: false, message: 'Failed to verify location' });
    }
});

// Haversine formula to calculate the distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}


// POST endpoint to receive notifications from Nokia
app.post('/notifyConnect', (req, res) => {
    const authToken = req.headers.authorization; // Extract the Bearer token

    // Verify the token (ensure it's the expected token)
    if (authToken !== '<auth-token>') {
        return res.status(403).send('Forbidden: Invalid token');
    }

    const notificationData = req.body; // Extract the notification data
    console.log('Received session update:', notificationData);
    res.send({notification: notificationData});

    // Process the session update (e.g., log it, store it, or notify clients)
    res.status(200).send('Notification received');
});

app.post('/notifyDisconnect', (req, res) => {
    const authToken = req.headers.authorization; // Extract the Bearer token

    // Verify the token (ensure it's the expected token)
    if (authToken !== '<auth-token>') {
        return res.status(403).send('Forbidden: Invalid token');
    }

    const notificationData = req.body; // Extract the notification data
    console.log('Received session update:', notificationData);
    res.send({notification: notificationData});

    // Process the session update (e.g., log it, store it, or notify clients)
    res.status(200).send('Notification received');
});

app.use('/water-source', waterSourceRoutes);

app.get

// Start the server
const PORT = 8088;

// app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Call the function to subscribe to Nokia services
    // const { subscribeToNokiaService } = require('./routes.js');
    subscribeToNokiaService(); // Start the subscription once the server is running
});

const wss = new WebSocketServer({ server });
wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', async() => {
        try {
            // When the WebSocket receives a message, we fetch the user's location
            const connectivityStatus = await myDevice.getConnectivity();
            if (connectivityStatus && connectivityStatus.latitude && connectivityStatus.longitude) {
                const locationData = {
                    latitude: connectivityStatus.latitude,
                    longitude: connectivityStatus.longitude
                };

                // Send the location data back to the WebSocket client
                ws.send(JSON.stringify({ location: locationData }));
            } else {
                ws.send(JSON.stringify({ error: 'Location data not available' }));
            }
        } catch (error) {
            console.error('Error retrieving location:', error);
            ws.send(JSON.stringify({ error: 'Failed to retrieve location' }));
        }
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });
});