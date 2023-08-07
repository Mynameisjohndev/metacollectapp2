import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';

const getCurrentGpsLocation = async (): Promise<GeoCoordinates | undefined> => {
  return new Promise(resolve => {
    Geolocation.getCurrentPosition(
      position => {
        resolve(position.coords);
        return position.coords;
      },
      error => {
        resolve(undefined);
        return undefined;
      },
      { enableHighAccuracy: false, timeout: 1500, maximumAge: 10000 },
    );
  });
};

export { getCurrentGpsLocation };
