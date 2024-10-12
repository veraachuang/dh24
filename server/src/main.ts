import { NetworkAsCodeClient } from 'network-as-code';
import express, { Express, Request, Response } from "express"

// Begin by creating a client for Network as Code:
// get rid of key later!!!!
const client = new NetworkAsCodeClient("759b437f75msh27c008fe0ed1851p1786c2jsnd1edf9db573d");

//  Then, we create an object for the mobile device we want to use
const myDevice = client.devices.get({
    networkAccessIdentifier: "4ff71f1f-8c95-40d0-b434-fb19f65a0214@testcsp.net",
    ipv4Address: {
        publicAddress: "233.252.0.2",
        privateAddress: "192.0.2.25",
        publicPort: 80,
    },
    ipv6Address: "2041:0000:140F::875B:131B",
    // The phone number does not accept spaces or parentheses
    phoneNumber: "+36721601234567"
});

// Create a connectivity subscription with an expiry date-time stamp
// 7 days expiration
const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000 * 7);

const mySubscription = await client.deviceStatus.subscribe(
    myDevice,
    "org.camaraproject.device-status.v0.connectivity-data",
    // Use HTTPS to send notifications
    "https://example.com/notify",
    {
        notificationAuthToken: "759b437f75msh27c008fe0ed1851p1786c2jsnd1edf9db573d",
        // Pass the previously created date-time object
        subscriptionExpireTime: expirationDate
    },
);

interface DeviceStatusNotification {
    id: string,
    source: string,
    type: string,
    specversion: string,
    datacontenttype: string,
    time: string,
    eventSubscriptionId: string,
    event: {
        eventType: string,
        eventTime: string,
        eventDetail: {
            device: {
                phoneNumber?: string,
                networkAccessIdentifier?: string,
                ipv4Address?: {
                    publicAddress?: string,
                    privateAddress?: string,
                    publicPort?: number
                },
                ipv6Address?: string
            },
            subscriptionId: string,
            deviceStatus: string,
            terminationReason: string
        }
    },
    data: {
        device: {
            phoneNumber?: string,
            networkAccessIdentifier?: string,
            ipv4Address?: {
                publicAddress?: string,
                privateAddress?: string,
                publicPort?: number
            },
            ipv6Address?: string
        },
        subscriptionId: string,
        terminationReason: string
    }
}

export const sendNotification = (req: Request, res: Response): void => {
    const notification: DeviceStatusNotification = req.body;
    console.log(notification);
    res.send({notifications: notification});
};

// Use this to show the roaming subscription status
// console.log(mySubscription);

// Or check when your subscription starts/expires:
console.log(mySubscription.startsAt);
console.log(mySubscription.expiresAt);