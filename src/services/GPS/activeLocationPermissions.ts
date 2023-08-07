/* eslint-disable no-async-promise-executor */
/* eslint-disable no-underscore-dangle */
import { Alert } from 'react-native';
import Permissions from 'react-native-permissions';

import { version } from '../../utils/returnApiLevel';

const requestLocationPermissions = async (): Promise<boolean> => {
  return new Promise(async resolve => {
    const fineLocation = await Permissions.request(
      'android.permission.ACCESS_FINE_LOCATION',
    );
    const background = await Permissions.request(
      'android.permission.ACCESS_BACKGROUND_LOCATION',
    );
    if (version < 29) {
      if (fineLocation === 'granted') {
        resolve(true);
        return true;
      }
    }
    if (fineLocation === 'granted' && background === 'granted') {
      resolve(true);
      return true;
    }
    resolve(false);
    return false;
  });
};

const verifyStatus = async () => {
  const fineLocation = await Permissions.check(
    'android.permission.ACCESS_FINE_LOCATION',
  );
  const background = await Permissions.check(
    'android.permission.ACCESS_BACKGROUND_LOCATION',
  );
  const coarse = await Permissions.check(
    'android.permission.ACCESS_COARSE_LOCATION',
  );
};

const requestGpsLocation = async () => {
  const fineLocation = await Permissions.request(
    'android.permission.ACCESS_FINE_LOCATION',
  );
  const background = await Permissions.request(
    'android.permission.ACCESS_BACKGROUND_LOCATION',
  );

  if (version < 29) {
    if (fineLocation === 'blocked') {
      Alert.alert(
        'Atenção',
        'Você negou o acesso da permissção, entre nas configurações e aprove a permissão!',
      );
      return false;
    }
    if (fineLocation !== 'granted') {
      Alert.alert('Atenção', 'Você precisa aceitar a permissão!');
      return false;
    }
    if (fineLocation === 'granted') {
      return true;
    }
  } else {
    if (fineLocation === 'blocked' && background === 'blocked') {
      Alert.alert(
        'Atenção',
        'Você negou o acesso de alguma das permissões, entre nas configurações e aprove as permissões!',
      );
      return false;
    }
    if (fineLocation === 'blocked' || background === 'blocked') {
      Alert.alert(
        'Atenção',
        'Você negou o acesso de alguma das permissões, entre nas configurações e aprove as permissões!',
      );
      return false;
    }
    if (fineLocation === 'denied' || background === 'denied') {
      Alert.alert('Atenção', 'Você precisa aceitar as permissões!');
      return false;
    }
    if (fineLocation === 'granted' && background === 'granted') {
      return true;
    }
  }
};

export { requestLocationPermissions, verifyStatus, requestGpsLocation };
