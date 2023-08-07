import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

import {
  localSynchronizeApp,
  ISynchronizeAppMetaCollect,
} from './Syncronzine/localSyncronizeApp';
import { syncronizeOpenCollect } from './Syncronzine/SyncronizeOpenCollect';

const validNetworkAccessAndExecutSyncronizeAppTask = async ({
  collect,
}: ISynchronizeAppMetaCollect) => {
  await NetInfo.fetch().then(state => {
    if (state.isConnected) {
      syncronizeOpenCollect({ collect, setVisible: () => null });
    } else {
      return false;
    }
  });
};

const validNetworkAccessAndExecutSyncronizeApp = async ({
  collect,
  DFIDCARRETEIRO,
  setVisible,
  setSelectedCollect,
  dischargeCollects,
  setLoadWagonerMessage,
  daysBefore,
  DFIMEI,
  signoutWagoner,
}: ISynchronizeAppMetaCollect) => {
  await NetInfo.fetch().then(state => {
    if (state.isConnected) {
      localSynchronizeApp({
        collect,
        DFIDCARRETEIRO,
        setVisible,
        setSelectedCollect,
        dischargeCollects,
        setLoadWagonerMessage,
        daysBefore,
        DFIMEI,
        signoutWagoner,
      });
    } else {
      return Alert.alert(
        'Houve um erro ao sincronizar devido à falta de acesso à internet',
        'Clique sem "sim" para que o processo possa iniciar novamente!',
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: () =>
              validNetworkAccessAndExecutSyncronizeApp({
                collect,
                DFIDCARRETEIRO,
                setVisible,
                daysBefore,
                DFIMEI,
                signoutWagoner,
              }),
          },
        ],
        { cancelable: false },
      );
    }
  });
};

export {
  validNetworkAccessAndExecutSyncronizeApp,
  validNetworkAccessAndExecutSyncronizeAppTask,
};
