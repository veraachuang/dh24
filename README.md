# Spotty - Dubhacks 2024
By Vera Chuang, Angela Wu, Orlando Scheil

## Getting Started
For this project, you need two things installed, Expo Go on your phone and Node.js on your computer which you can find the downloads to here:

- [Expo Go](https://expo.dev/client)
- [Node.js](https://nodejs.org/en/download)

## What it does
Spotty is an offline-first location app tailored for backpackers and travelers. Users can begin by selecting a destination point for their journey. It provides key features like offline location retrieval, SOS alerts, and SMS messaging to emergency contacts. The app leverages Nokia’s Network as Code API to retrieve real-time location data when there’s network availability and store it offline when connectivity is limited. Users can view nearby water sources using EPA data (especially close to their checkpoints), receive notifications regarding their current connectivity, and confirm their location relative to the nearest city center.

## How we built it
We built Spotty using:
- React Native and Expo for the mobile front-end development, enabling a cross-platform solution for both iOS and Android.
- Nokia’s Network as Code API to retrieve real-time location data even in low-connectivity scenarios.
- US EPA Dataset Gateway API to locate nearby water sources and pure water spots for travelers.
- WebSockets to provide live updates when connectivity is available, ensuring real-time synchronization between the user’s location and backend services.
- Offline support with custom hooks that handle map downloads and caching to ensure that core features like maps and SOS remain functional without network access.

