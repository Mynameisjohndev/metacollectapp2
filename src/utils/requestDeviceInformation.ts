/* eslint-disable no-async-promise-executor */
import { Platform, NativeModules, PermissionsAndroid } from 'react-native';
import Device from 'react-native-device-info';

import { DeviceInfo } from '../types/DeviceInfo';
import { formatBytes } from './formatBytes';
import { formatHzToMhz } from './formatHzToMhz';
import { currentDate } from './getCurrentDate';
import { currentTime } from './getCurrentTime';

const { DeviceStorage } = NativeModules;

async function requestStoragePermission() {
  try {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    return status;
  } catch (err) {
    return 'err';
  }
}

interface IRequestDeviceInformation {
  DFIDCARRETEIRO?: number;
  DFIDLICENCA?: string;
}

const requestDeviceInformation = ({
  DFIDCARRETEIRO,
  DFIDLICENCA,
}: IRequestDeviceInformation): Promise<DeviceInfo> => {
  if (Platform.OS === 'android') {
    return new Promise(async resolve => {
      const permission = await requestStoragePermission();
      const { DFESPACOTOTAL } = await DeviceStorage.getTotalStorage();
      const { DFESPACOUTILIZADO } = await DeviceStorage.getUsedStorage();
      const { DFDATAINSTALACAO, DFHORAINSTALACAO } =
        await DeviceStorage.getInstallationTime();
      const DFMEMORIARAM = await DeviceStorage.getDeviceRAM();
      const cpu = await DeviceStorage.getCPUFrequency();
      const DFVERSAOSO = await DeviceStorage.getSystemVersion();
      const DFMODELOAPARELHO = await DeviceStorage.getDeviceModel();
      const DFIMEI = await DeviceStorage.getUniqueIdSync();
      const DFVERSAOAPP = await DeviceStorage.getAppVersion();
      if (permission === 'granted') {
        const deviceInfo: DeviceInfo = {
          DFESPACOTOTAL,
          DFESPACOUTILIZADO,
          DFDATAINSTALACAO,
          DFHORAINSTALACAO,
          DFMEMORIARAM,
          DFCPU: formatHzToMhz(cpu),
          DFSO: 'Android',
          DFVERSAOSO,
          DFMODELOAPARELHO,
          DFIMEI,
          DFIDCARRETEIRO,
          DFIDLICENCA,
          DFVERSAOAPP,
          DFDATAVINCULO: currentDate(),
          DFHORAVINCULO: currentTime(),
        };
        resolve(deviceInfo);
        return deviceInfo;
      }
    });
  }
  if (Platform.OS === 'ios') {
    // Possível implemtação futura
  }
};

const checkStorage = async () => {
  return new Promise(async resolve => {
    const getTotalStorage = await DeviceStorage.getTotalStorage();
    const getUsedStorage = await DeviceStorage.getUsedStorage();
    const dateInstalation = await DeviceStorage.getInstallationTime();
    console.log({
      used: getTotalStorage.total - getUsedStorage.total,
      total: getTotalStorage.total,
      dateInstalation,
    });
  });
};

export { requestDeviceInformation };
