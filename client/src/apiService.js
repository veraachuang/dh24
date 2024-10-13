const API_URL = 'https://localhost:8088/water-source/nearby';

const getWaterSources = async (latitude, longitude) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch water sources');
    }

    return await response.json();
};

export default {
    getWaterSources,
};
