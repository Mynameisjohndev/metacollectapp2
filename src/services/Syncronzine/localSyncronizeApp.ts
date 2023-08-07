import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';

import { synchronizeAppMetaCollect } from '../../api/GET';
import { ISignoutWagoner } from '../../context/wagonerContext';
import { Collect } from '../../types/collect';
import { stopTask } from '../Task/stopTask';
import { updateSynchronizeStatus } from './services';
import { syncronizeDischargeCollects } from './SyncronizeDischargeCollects';
import { syncronizeOpenCollect } from './SyncronizeOpenCollect';

interface ISynchronizeAppMetaCollect {
  collect?: Collect;
  dischargeCollects?: Collect[];
  DFIDCARRETEIRO?: string | number;
  setVisible?: Dispatch<SetStateAction<boolean>>;
  setSelectedCollect?: Dispatch<SetStateAction<Collect[]>>;
  setLoadWagonerMessage?: Dispatch<SetStateAction<string>>;
  daysBefore: number;
  DFIMEI: string;
  signoutWagoner: ISignoutWagoner;
}
const localSynchronizeApp = async ({
  DFIDCARRETEIRO,
  collect,
  setVisible,
  setSelectedCollect,
  dischargeCollects,
  setLoadWagonerMessage,
  daysBefore,
  DFIMEI,
  signoutWagoner,
}: ISynchronizeAppMetaCollect) => {
  stopTask();
  setVisible(true);
  updateSynchronizeStatus({ data: { isSynchronized: false } });
  const showAlert = () => {
    return Alert.alert(
      'Erro de sincronização',
      'Clique sem "sim" para que o processo possa iniciar novamente!',
      [
        {
          text: 'Não',
          style: 'cancel',
          onPress: () => {
            setVisible(false);
          },
        },
        {
          text: 'Sim',
          onPress: () =>
            localSynchronizeApp({
              collect,
              DFIDCARRETEIRO,
              setVisible,
              dischargeCollects,
              setSelectedCollect,
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

  const executeSynchronizeAppMetaCollect = (res: boolean) => {
    if (res === true) {
      synchronizeAppMetaCollect({
        setLoadingExistWagoner: setVisible,
        DFIDCARRETEIRO,
        setSelectedCollect,
        setLoadWagonerMessage,
        daysBefore,
        DFIMEI,
        signoutWagoner,
      });
    } else {
      showAlert();
    }
  };

  // if (collect) {
  //   const syncronizeOpenCollectResponse = await syncronizeOpenCollect({
  //     setVisible,
  //     collect,
  //   });
  //   if (syncronizeOpenCollectResponse === true) {
  //     console.log('finalizou');
  //     setVisible(false);
  //   }
  //   setVisible(false);
  // }

  if (dischargeCollects.length > 0 && collect) {
    // console.log("Sincroniza somente coletas 'D', coleta 'A' e as tabelas");
    const syncronizedischargeCollectsReponse =
      await syncronizeDischargeCollects({ dischargeCollects, setVisible });
    if (syncronizedischargeCollectsReponse === false) {
      return showAlert();
    }
    const syncronizeOpenCollectResponse = await syncronizeOpenCollect({
      setVisible,
      collect,
    });
    if (syncronizeOpenCollectResponse === false) {
      return showAlert();
    }
    return executeSynchronizeAppMetaCollect(true);
  }

  if (dischargeCollects.length > 0 && !collect) {
    // console.log(`Sincroniza somente coletas 'D' e as tabelas`);
    const syncronizedischargeCollectsReponse =
      await syncronizeDischargeCollects({ dischargeCollects, setVisible });
    if (syncronizedischargeCollectsReponse === false) {
      return showAlert();
    }
    return executeSynchronizeAppMetaCollect(true);
  }

  if (dischargeCollects.length === 0 && collect) {
    // console.log("Sincroniza coleta 'A' e as tabelas");
    const syncronizeOpenCollectResponse = await syncronizeOpenCollect({
      setVisible,
      collect,
    });
    if (syncronizeOpenCollectResponse === false) {
      return showAlert();
    }
    return executeSynchronizeAppMetaCollect(true);
  }

  if (dischargeCollects.length === 0 && !collect) {
    // console.log('Sincroniza somente as tabelas');
    return executeSynchronizeAppMetaCollect(true);
  }
};

export { localSynchronizeApp, ISynchronizeAppMetaCollect };
