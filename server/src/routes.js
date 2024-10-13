
import {myDevice, client} from "./devices.js";


export async function subscribeToNokiaService() {
    // Create a connectivity subscription with an expiry date-time stamp
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

    try {
        const mySubscription = await client.deviceStatus.subscribe(
            myDevice,
            "org.camaraproject.device-status.v0.connectivity-data",
            // Use HTTPS to send notifications
            "https://localhost:8088.com/notifyConnect", {
                notificationAuthToken: "auth-token",
                // Pass the previously created date-time object
                subscriptionExpireTime: expirationDate
            },
        );
        console.log('Subscription successful:', mySubscription);

        const mySubscription2 = await client.deviceStatus.subscribe(
            myDevice,
            "org.camaraproject.device-status.v0.connectivity-disconnected",
            // Use HTTPS to send notifications
            "https://localhost:8088.com/notifyDisconnect", {
                notificationAuthToken: "auth-token",
                // Pass the previously created date-time object
                subscriptionExpireTime: expirationDate
            },
        );
        console.log('Subscription successful:', mySubscription2);
    } catch (error) {
        console.error('Error subscribing to Nokia service:', error);
    }

//
//     // Get the subscription previously created by its ID
//     const subscription = await client.deviceStatus.get(
//         mySubscription.eventSubscriptionId
//     );
//     const subscription2 = await client.deviceStatus.get(
//         mySubscription2.eventSubscriptionId
//     );
//
//     // Retrieve list of active Device Status subscriptions for a client:
//     const subscriptions = await client.deviceStatus.getSubscriptions();
//
//     // Check the connectivity or roaming status
//     // subscriptions of a given device
//     const connectivityStatus = await myDevice.getConnectivity();
//
//     const roamingStatus = await myDevice.getRoaming();
}