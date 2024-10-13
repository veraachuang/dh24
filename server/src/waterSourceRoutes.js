import express from 'express';
import axios from 'axios';

const router = express.Router();

// Helper function to calculate distance (Haversine formula)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

// POST endpoint to fetch nearby water sources
router.post('/nearby', async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        // Fetch water sources from OpenStreetMap
        const radius = 5000; // 5km radius
        const osmUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:${radius},${latitude},${longitude})[natural=water];out;`;

        const response = await axios.get(osmUrl);
        const waterSources = response.data.elements;

        // Process water sources and calculate distances
        const processedSources = waterSources.map(source => {
            const distance = calculateDistance(latitude, longitude, source.lat, source.lon);
            return {
                name: source.tags.name || 'Unnamed Water Source',
                coordinates: { lat: source.lat, lon: source.lon },
                distance: distance
            };
        });

        res.json(processedSources);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching water sources' });
    }
});

export default router;
