import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import Permissions from 'react-native-permissions';

import { getDBConnection } from '../../databases/conection';
import { insertTbRegistro } from '../../databases/TBREGISTRO/INSERT/insertTbRegistro';
import { currentDate } from '../../utils/getCurrentDate';
import { currentTime } from '../../utils/getCurrentTime';
import { returnOfImeiPermission } from '../../utils/readPhoneStatePermission';
import { validApiLevelWithGPS } from '../GPS/validApiLevelWithGPS';
import { validReceiveCurrentGpsLocationCoords } from '../GPS/validReceiveCurrentGpsLocationCoords';
import { task } from './notificationService';

interface IExecuteGPSTask {
  DFIDCOLETAAPP: string | number;
  DFIDCARRETEIRO: string | number;
}

const executeGPSTask = async ({
  DFIDCOLETAAPP,
  DFIDCARRETEIRO,
}: IExecuteGPSTask) => {
  const fineLocation = await Permissions.check(
    'android.permission.ACCESS_FINE_LOCATION',
  );
  const background = await Permissions.check(
    'android.permission.ACCESS_BACKGROUND_LOCATION',
  );
  validApiLevelWithGPS({ background, fineLocation }).then(async res => {
    if (res) {
      returnOfImeiPermission().then(async res => {
        const db = await getDBConnection();
        let geometry = await validReceiveCurrentGpsLocationCoords();
        // Adicionei o diferente de undefined para o geometry
        if (typeof res === 'string' && geometry !== undefined) {
          insertTbRegistro({
            db,
            DFDATAREGISTRO: currentDate(),
            DFHORAREGISTRO: currentTime(),
            DFTIPOREGISTRO: 'G',
            DFIDCOLETAAPP,
            DFIDCOLETA: '',
            DFIDITEMCOLETAAPP: null,
            DFOBSERVACAO: 'Registro da geolocalização!',
            DFIMEI: res,
            DFIDCARRETEIRO,
            geometry,
          });
        }
      });
    }
  });
};

const gpsTask = ({ DFIDCOLETAAPP, DFIDCARRETEIRO }: IExecuteGPSTask) => {
  ReactNativeForegroundService.add_task(
    async () => {
      await executeGPSTask({ DFIDCOLETAAPP, DFIDCARRETEIRO });
      ReactNativeForegroundService.update_task(task, {});
    },
    {
      delay: 60 * 1000,
      onLoop: true,
      taskId: '2',
    },
  );
};

export { gpsTask };
