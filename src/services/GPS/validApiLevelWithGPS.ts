import { Alert } from 'react-native';
import { PermissionStatus } from 'react-native-permissions';

import { version } from '../../utils/returnApiLevel';

interface IValidApiLevelWithGPS {
  fineLocation: PermissionStatus;
  background: PermissionStatus;
}
const validApiLevelWithGPS = async ({
  background,
  fineLocation,
}: IValidApiLevelWithGPS) => {
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
    return true;
  }
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
  return true;
};
export { validApiLevelWithGPS };
