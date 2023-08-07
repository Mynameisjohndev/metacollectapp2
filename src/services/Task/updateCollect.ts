import ReactNativeForegroundService from '@supersami/rn-foreground-service';

import { validNetworkAccessAndExecutSyncronizeAppTask } from '..';

import { ISynchronizeAppMetaCollect } from '../Syncronzine/localSyncronizeApp';
import { task } from './notificationService';

const collectTask = ({
  collect,
  DFIDCARRETEIRO,
  setVisible,
  daysBefore,
  DFIMEI,
  signoutWagoner,
}: ISynchronizeAppMetaCollect) => {
  ReactNativeForegroundService.add_task(
    async () => {
      await validNetworkAccessAndExecutSyncronizeAppTask({
        collect,
        daysBefore,
        DFIMEI,
        signoutWagoner,
      });
      ReactNativeForegroundService.update_task(task, {});
    },
    {
      delay: 600 * 1000,
      onLoop: true,
      taskId: '3',
    },
  );
};

export { collectTask };
