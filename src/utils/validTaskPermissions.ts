/* eslint-disable no-async-promise-executor */
import { Alert, Linking } from 'react-native';
import Permissions from 'react-native-permissions';

import { version } from './returnApiLevel';

const openAppSettings = async () => {
  await Linking.openSettings();
};

const replaceUserToSettings = () => {
  Alert.alert(
    'Aconteceu um erro',
    "Você pode ter negado ou rejeitado algumas das permissões, clique em 'sim' para abrir as configurações e ativas as permissões",
    [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: async () => openAppSettings(),
      },
    ],
  );
};

const validTaskPermissions = () => {
  return new Promise(async resolve => {
    const readPhone = await Permissions.request(
      'android.permission.READ_PHONE_STATE',
    );
    const fineLocation = await Permissions.request(
      'android.permission.ACCESS_FINE_LOCATION',
    );
    const background = await Permissions.request(
      'android.permission.ACCESS_BACKGROUND_LOCATION',
    );
    if (version < 29) {
      if (fineLocation === 'granted' && readPhone === 'granted') {
        resolve(true);
        return true;
      }
      replaceUserToSettings();
      resolve(false);
      return false;
    }
    if (
      background === 'granted' &&
      fineLocation === 'granted' &&
      readPhone === 'granted'
    ) {
      resolve(true);
      return true;
    }
    replaceUserToSettings();
    resolve(false);
    return false;
  });
};

export { validTaskPermissions, openAppSettings };
