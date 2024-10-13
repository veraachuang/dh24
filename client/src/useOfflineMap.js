import MapboxGL from '@rnmapbox/maps';
import { useEffect } from 'react';

const useOfflineMap = (region) => {
    useEffect(() => {
        if (region) {
            const downloadOfflineMap = async () => {
                const offlineRegion = await MapboxGL.offlineManager.createPack({
                    name: 'offlinePack',
                    bounds: [[region.longitude - 0.05, region.latitude - 0.05], [region.longitude + 0.05, region.latitude + 0.05]],
                    styleURL: MapboxGL.StyleURL.Street,
                    minZoom: 12,
                    maxZoom: 16,
                });

                offlineRegion.subscribe('progress', (offlinePack) => {
                    console.log(`Download Progress: ${offlinePack.progress.percentage}%`);
                });
            };

            downloadOfflineMap();
        }
    }, [region]);
};

export default useOfflineMap;
