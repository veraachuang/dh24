import { NetworkAsCodeClient } from "network-as-code";

// We begin by creating a Network as Code client
export const client = new NetworkAsCodeClient("application-id");

// Then, we create an object for the mobile device we want to use
export const myDevice = client.devices.get({
    networkAccessIdentifier: "access-identifier",
    ipv4Address: {
        publicAddress: "233.252.0.2",
        privateAddress: "192.0.2.25",
        publicPort: 80,
    },
    ipv6Address: "2041:0000:140F::875B:131B",
    // The phone number does not accept spaces or parentheses
    phoneNumber: "+36721601234567"
});
