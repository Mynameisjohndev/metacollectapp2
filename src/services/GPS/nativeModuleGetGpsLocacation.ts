import { NativeModules } from 'react-native';

const { LocationModule } = NativeModules;

export const nativeModuleGetGpsLocacation = () => {
  return new Promise(resolve => {
    try {
      LocationModule.requestLocationUpdates().then(location => {
        resolve(location);
        return location;
      });
    } catch (_) {
      resolve(undefined);
      return undefined;
    }
  });
};
