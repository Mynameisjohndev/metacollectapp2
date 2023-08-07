import DeviceInfo from 'react-native-device-info';

const version = DeviceInfo.getApiLevelSync();

export { version };
