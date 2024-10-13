import { NetworkAsCodeClient } from "network-as-code";

// We begin by creating a Network as Code client
const client = new NetworkAsCodeClient("cabad23924mshaee2e2cdadefb73p195a25jsn85dbeafea5f8");

// Then, we create an object for the mobile device we want to use
const myDevice = client.devices.get({
    networkAccessIdentifier: "device@testcsp.net",
    ipv4Address: {
        publicAddress: "233.252.0.2",
        privateAddress: "192.0.2.25",
        publicPort: 80,
    },
    ipv6Address: "2041:0000:140F::875B:131B",
    // The phone number does not accept spaces or parentheses
    phoneNumber: "+36721601234567"
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
        "https://localhost:8088.com/notifyConnect", {
            notificationAuthToken: "<auth-token>",
            // Pass the previously created date-time object
            subscriptionExpireTime: expirationDate
        },
    );

    const mySubscription2 = await client.deviceStatus.subscribe(
        myDevice,
        "org.camaraproject.device-status.v0.connectivity-disconnected",
        // Use HTTPS to send notifications
        "https://localhost:8088.com/notifyDisconnect", {
            notificationAuthToken: "<auth-token>",
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