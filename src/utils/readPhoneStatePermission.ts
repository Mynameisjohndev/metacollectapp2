/* eslint-disable no-async-promise-executor */
import { Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Permissions from 'react-native-permissions';

const requestAccessPhoneState = (): Promise<boolean> => {
  return new Promise(async resolve => {
    const status = await Permissions.request(
      'android.permission.READ_PHONE_STATE',
    );
    if (status === 'granted') {
      resolve(true);
      return true;
    }
    resolve(false);
    return false;
  });
};

const requestAccessReadPhoneState = async (): Promise<boolean> => {
  return new Promise(resolve => {
    Permissions.request('android.permission.READ_PHONE_STATE').then(_ => {
      resolve(true);
      return true;
    });
  });
};

const returnOfImeiPermission = async (): Promise<string | boolean> => {
  return new Promise(resolve => {
    try {
      Permissions.request('android.permission.READ_PHONE_STATE')
        .then(response => {
          if (response === 'granted') {
            resolve(DeviceInfo.getUniqueIdSync());
            return DeviceInfo.getUniqueIdSync();
          }
          if (response === 'denied') {
            Alert.alert(
              'Erro de permissão',
              'Você precisa aceitar as permissões para o aplicativo acessar as informações do dispositivo.',
            );
            resolve(false);
            return false;
          }
          if (response === 'blocked') {
            Alert.alert(
              'Erro de permissão',
              'Abra as configurações do app e ative todas permissões para o uso no aplicativo.',
            );
            resolve(false);
            return false;
          }
          resolve(false);
          return false;
        })
        .catch(_ => {
          resolve(false);
          return false;
        });
    } catch (_) {
      resolve(false);
      return false;
    }
  });
};
export {
  requestAccessReadPhoneState,
  returnOfImeiPermission,
  requestAccessPhoneState,
};
