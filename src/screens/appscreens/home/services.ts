/* eslint-disable no-use-before-define */
/* eslint-disable no-async-promise-executor */
import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';

import { ISignoutWagoner } from '../../../context/wagonerContext';
import { getDBConnection } from '../../../databases/conection';
import { getCollects } from '../../../databases/TBCOLETA/SELECT/getCollects';
import { selectOpenCollect } from '../../../databases/TBCOLETA/SELECT/selectOpenCollect';
import { selectLastSynchronization } from '../../../databases/TBCONFIGURACAO/SELECT/selectLastSynchronization';
import { HomeProps } from '../../../routes/types/approutes/appscreen';
import { validNetworkAccessAndExecutSyncronizeApp } from '../../../services';
import { getSynchronizeStatus } from '../../../services/Syncronzine/services';
import { Collect } from '../../../types/collect';

interface IHandleSynchronizeApp {
  collect: Collect[];
  dischargeCollects: Collect[];
  DFIDCARRETEIRO: string | number;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setSelectedCollect: Dispatch<SetStateAction<Collect[]>>;
  setLoadWagonerMessage?: Dispatch<SetStateAction<string>>;
  daysBefore: number;
  DFIMEI: string;
  signoutWagoner: ISignoutWagoner;
}

interface IExecuteGetOpenCollect {
  setSelectedCollect: Dispatch<SetStateAction<Collect[]>>;
  setCollect: Dispatch<SetStateAction<Collect[]>>;
  setDischargeCollects: Dispatch<SetStateAction<Collect[]>>;
  setLoadingCollect: Dispatch<SetStateAction<boolean>>;
  synchronizeData: IHandleSynchronizeApp;
  DFIDCARRETEIRO: number;
  DFIMEI: string;
}

interface IHandleNavigateMyCollect {
  collect: Collect[];
  screen: HomeProps;
}

const handleSynchronizeApp = ({
  DFIDCARRETEIRO,
  collect,
  setSelectedCollect,
  setVisible,
  dischargeCollects,
  setLoadWagonerMessage,
  daysBefore,
  DFIMEI,
  signoutWagoner,
}: IHandleSynchronizeApp) => {
  Alert.alert(
    'Sincronizar',
    'Deseja sicronizar?',
    [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () =>
          validNetworkAccessAndExecutSyncronizeApp({
            collect: collect[0],
            DFIDCARRETEIRO,
            setVisible,
            setSelectedCollect,
            dischargeCollects,
            setLoadWagonerMessage,
            daysBefore,
            DFIMEI,
            signoutWagoner,
          }),
      },
    ],
    { cancelable: false },
  );
};

const executeGetOpenCollect = async ({
  setDischargeCollects,
  setSelectedCollect,
  setLoadingCollect,
  setCollect,
  synchronizeData,
  DFIDCARRETEIRO,
  DFIMEI,
}: IExecuteGetOpenCollect) => {
  const db = await getDBConnection();
  const openCollect = (await selectOpenCollect({
    db,
  })) as Collect[];
  setSelectedCollect(openCollect);
  setCollect(openCollect);
  const dischargeCollects = await getCollects({ db, DFSTATUS: 'D' });
  setDischargeCollects(dischargeCollects);
  const synchronize = await getSynchronizeStatus();
  if (synchronize === false) {
    Alert.alert(
      'Erro de sincronização',
      'A última vez que você sincronizou, ocorreu um erro. Sincronize seus dados novamente para ter consistência nos dados.',
      [
        {
          text: 'Não',
          style: 'cancel',
          onPress: () => setLoadingCollect(false),
        },
        {
          text: 'Sim',
          onPress: () => {
            validNetworkAccessAndExecutSyncronizeApp({
              ...synchronizeData,
              collect: synchronizeData.collect[0],
              daysBefore: synchronizeData.daysBefore,
              DFIMEI,
            });
          },
        },
      ],
    );
  }
  const lastSync = await selectLastSynchronization({
    db,
    DFIDCARRETEIRO,
  });
  if (lastSync === false) {
    Alert.alert(
      'Atenção',
      'Você ainda não sincronizou seus dados hoje, sincronize para manter eles consistentes',
      [
        {
          text: 'Não',
          style: 'cancel',
          onPress: () => setLoadingCollect(false),
        },
        {
          text: 'Sim',
          onPress: () => {
            validNetworkAccessAndExecutSyncronizeApp({
              ...synchronizeData,
              collect: synchronizeData.collect[0],
            });
          },
        },
      ],
    );
  }
  return setLoadingCollect(false);
};

const handleNavigateMyCollect = ({
  collect,
  screen,
}: IHandleNavigateMyCollect) => {
  screen.navigation.navigate('MyCollect', {
    screen: 'InfoCollect',
    params: { collect },
  });
};

const handleNavigateNewCollect = ({ navigation }: HomeProps) => {
  navigation.navigate('NewCollect', { screen: 'First' });
};

const handleNavigateHistoric = ({ navigation }: HomeProps) => {
  navigation.navigate('Historic', { screen: 'First' });
};

const handleNavigateSettings = ({ navigation }: HomeProps) => {
  navigation.navigate('Settings', { screen: 'Home' });
};

const handleNavigateSchedules = ({ navigation }: HomeProps) => {
  navigation.navigate('Schedules', { screen: 'Home' });
};

export {
  handleSynchronizeApp,
  executeGetOpenCollect,
  handleNavigateMyCollect,
  handleNavigateNewCollect,
  handleNavigateHistoric,
  handleNavigateSettings,
  handleNavigateSchedules,
  IHandleSynchronizeApp,
};
