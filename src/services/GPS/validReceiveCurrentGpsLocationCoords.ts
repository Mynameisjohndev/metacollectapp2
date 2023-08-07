/* eslint-disable no-async-promise-executor */
import { GeoCoordinates } from 'react-native-geolocation-service';

import { getCurrentGpsLocation } from './getCurrentGpsLocation';
import { validGetGps } from './validGetGps';

interface IGeometry {
  type: string;
  coordinates: number[];
}
const validReceiveCurrentGpsLocationCoords = (): Promise<
  IGeometry | undefined
> => {
  return new Promise(async resolve => {
    let coords = (await validGetGps()) as GeoCoordinates;
    if (coords === undefined) {
      getCurrentGpsLocation().then(res => {
        if (res !== undefined) {
          const { latitude, longitude } = res;
          const geometry: IGeometry = {
            type: 'Point',
            coordinates: [longitude, latitude],
          };
          resolve(geometry);
          return geometry;
        }
        resolve(undefined);
        return undefined;
      });
    } else {
      const { latitude, longitude } = coords;
      const geometry: IGeometry = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
      resolve(geometry);
      return geometry;
    }
  });
};
export { validReceiveCurrentGpsLocationCoords };
