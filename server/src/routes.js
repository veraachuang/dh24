import { NetworkAsCodeClient } from "network-as-code";

// We begin by creating a Network as Code client
const client = new NetworkAsCodeClient("759b437f75msh27c008fe0ed1851p1786c2jsnd1edf9db573d");

// Then, we create an object for the mobile device we want to use
const myDevice = client.devices.get({
    networkAccessIdentifier: "4ff71f1f-8c95-40d0-b434-fb19f65a0214@testcsp.net",
    ipv4Address: {
        publicAddress: "233.252.0.2",
        privateAddress: "192.0.2.25",
        publicPort: 80,
    },
});

export async function subscribeToNokiaService() {
    // Create a connectivity subscription with an expiry date-time stamp
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

// Simply change the event_type to
// "org.camaraproject.device-status.v0.roaming-status" whenever needed.
    const mySubscription = await client.deviceStatus.subscribe(
        myDevice,
        "org.camaraproject.device-status.v0.connectivity-data",
        // Use HTTPS to send notifications
        "https://localhost:8088.com/notifyConnect",
        {
            notificationAuthToken: "AUTH0",
            // Pass the previously created date-time object
            subscriptionExpireTime: expirationDate
        },
    );

    const mySubscription2 = await client.deviceStatus.subscribe(
        myDevice,
        "org.camaraproject.device-status.v0.connectivity-disconnected",
        // Use HTTPS to send notifications
        "https://localhost:8088.com/notifyDisconnect",
        {
            notificationAuthToken: "AUTH0",
            // Pass the previously created date-time object
            subscriptionExpireTime: expirationDate
        },
    );



// Get the subscription previously created by its ID
    const subscription = await client.deviceStatus.get(
        mySubscription.eventSubscriptionId
    );
    const subscription2 = await client.deviceStatus.get(
        mySubscription2.eventSubscriptionId
    );

// Retrieve list of active Device Status subscriptions for a client:
    const subscriptions = await client.deviceStatus.getSubscriptions();

// Check the connectivity or roaming status
// subscriptions of a given device
    const connectivityStatus = await myDevice.getConnectivity();

    const roamingStatus = await myDevice.getRoaming();
}

