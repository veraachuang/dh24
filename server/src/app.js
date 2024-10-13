import express from "express"
import bodyParser from 'body-parser';
import { NetworkAsCodeClient } from "network-as-code";
import {subscribeToNokiaService} from "./routes.js";
import WebSocket, { WebSocketServer } from 'ws';

// Set up WebSocket server
const wss = new WebSocketServer({ port: 8080 }); // WebSocket server on port 8080

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

// POST endpoint to receive notifications from Nokia
app.post('/notifyConnect', (req, res) => {
    const authToken = req.headers.authorization;  // Extract the Bearer token

    // Verify the token (ensure it's the expected token)
    if (authToken !== '<auth-token>') {
        return res.status(403).send('Forbidden: Invalid token');
    }

    const notificationData = req.body;  // Extract the notification data
    console.log('Received session update:', notificationData);

    // Broadcast notification to all connected WebSocket clients
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ notification: notificationData }));
        }
    });

    // Process the session update (e.g., log it, store it, or notify clients)
    res.status(200).send('Notification received');
});

app.post('/notifyDisconnect', (req, res) => {
    const authToken = req.headers.authorization;  // Extract the Bearer token

    // Verify the token (ensure it's the expected token)
    if (authToken !== '<auth-token>') {
        return res.status(403).send('Forbidden: Invalid token');
    }

    const notificationData = req.body;  // Extract the notification data
    console.log('Received session update:', notificationData);
    // Broadcast notification to all connected WebSocket clients
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ notification: notificationData }));
        }
    });

    // Process the session update (e.g., log it, store it, or notify clients)
    res.status(200).send('Notification received');
});

// Start the server
const PORT = 8088;

// app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Call the function to subscribe to Nokia services
    // const { subscribeToNokiaService } = require('./routes.js');
    subscribeToNokiaService();  // Start the subscription once the server is running
});
