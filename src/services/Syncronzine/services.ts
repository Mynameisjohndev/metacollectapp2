/* eslint-disable no-await-in-loop */
/* eslint-disable no-async-promise-executor */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { getDBConnection } from '../../databases/conection';
import { updateDischargeCollect } from '../../databases/TBCOLETA/UPDATE/updateDischargeCollect';
import { updateIdColetaInColeta } from '../../databases/TBCOLETA/UPDATE/updateIdColetaInColeta';
import { updateDataAfterSynchronization } from '../../databases/TBCONFIGURACAO/UPDATE/updateDataAfterSynchronization';
import { Collect } from '../../types/collect';
import { CollectItem } from '../../types/collectItem';
import { ProducerCollect } from '../../types/producerCollect';
import { Register } from '../../types/register';
import { RegisterItemDb } from '../../types/registerItemDb';
import { StoredMouth } from '../../types/storedMouth';
import { currentDate } from '../../utils/getCurrentDate';
import { currentTime } from '../../utils/getCurrentTime';
import { upsertStoredMouth } from './modules/BOCAARMAZENADA';
import { createCollect, getCollect, updateCollect } from './modules/COLETA';
import { updateCollectItem, upsertCollectItem } from './modules/ITEMCOLETA';
import { upsertProducerCollect } from './modules/PRODUTOR';
import {
  createRegisterBetch,
  createRegisterWithItemRegister,
} from './modules/REGISTRO';

interface ICollectTables {
  collectItems: CollectItem[];
  storedMouths: StoredMouth[];
  producerCollects: ProducerCollect[];
  registerCollects: Register[];
  registerItemCollect: RegisterItemDb[];
}

interface ICollect {
  collect: Collect;
  db: SQLiteDatabase;
  tables: ICollectTables;
}

interface ICollectID {
  collect: Collect;
  db: SQLiteDatabase;
  DFIDCOLETA?: string;
  tables: ICollectTables;
}

interface IUpdateSynchronizeStatus {
  DFIDCARRETEIRO?: number;
  isSynchronized: boolean;
}
interface IDataUpdateSynchronizeStatus {
  data: IUpdateSynchronizeStatus;
}

const syncronizeCollect = async ({
  collect,
  db,
  DFIDCOLETA,
  tables,
}: ICollectID) => {
  const {
    collectItems,
    producerCollects,
    registerCollects,
    registerItemCollect,
    storedMouths,
  } = tables;

  const RECEIVEDFIDCOLETA = DFIDCOLETA;
  const { DFCOLETASICRONIZADA, DFSTATUS } = collect;
  return new Promise(async resolve => {
    let hasCreatedRegister;
    let updateCollectdCollectItemCount = 0;
    let upsertStoredMoutCount = 0;
    let upsertProducerCollectCount = 0;
    let createRegisterItemCount = 0;
    if (!collect.DFIDCOLETA) {
      updateIdColetaInColeta({
        db,
        DFIDCOLETA: Number(DFIDCOLETA),
        DFIDCOLETAAPP: Number(collect.DFIDCOLETAAPP),
      });
    }

    if (DFSTATUS === 'D' && DFCOLETASICRONIZADA === 'S') {
      resolve(true);
      return true;
    }
    if (DFSTATUS === 'D' && DFCOLETASICRONIZADA === 'N') {
      updateDischargeCollect({
        db,
        DFIDCOLETAAPP: Number(collect.DFIDCOLETAAPP),
      });
    }

    hasCreatedRegister = await createRegisterBetch({
      db,
      DFIDCOLETA: String(DFIDCOLETA),
      DFIDCOLETAAPP: Number(collect.DFIDCOLETAAPP),
      registerCollects,
    });
    for (let collectItem in collectItems) {
      const {
        DFIDCOLETA,
        DFIDITEMCOLETAAPP,
        DFIDITEMCOLETA,
        DFIDTANQUE,
        DFIDCOLETAAPP,
      } = collectItems[collectItem];

      if (DFIDCOLETA) {
        const responseCollectItem = await updateCollectItem(
          collectItems[collectItem],
        );
        if (responseCollectItem === true) {
          updateCollectdCollectItemCount += 1;
        }
        const storeMouthResponse = await upsertStoredMouth({
          DFIDITEMCOLETAAPP: Number(DFIDITEMCOLETAAPP),
          DFIDITEMCOLETA: Number(DFIDITEMCOLETA),
          storedMouths,
        });
        if (storeMouthResponse === true) {
          upsertStoredMoutCount += 1;
        }
        const storeProducerCollect = await upsertProducerCollect({
          DFIDITEMCOLETAAPP: Number(DFIDITEMCOLETAAPP),
          DFIDITEMCOLETA: Number(DFIDITEMCOLETA),
          producerCollects,
        });
        if (storeProducerCollect === true) {
          upsertProducerCollectCount += 1;
        }
        const storeRegister = await createRegisterWithItemRegister({
          db,
          DFIDCOLETA,
          DFIDCOLETAAPP: String(DFIDCOLETAAPP),
          DFIDITEMCOLETA,
          DFIDITEMCOLETAAPP: String(DFIDITEMCOLETAAPP),
          registerCollects,
          registerItemCollect,
        });
        if (storeRegister === true) {
          createRegisterItemCount += 1;
        }
      } else {
        const response = await upsertCollectItem({
          DFIDCOLETA: RECEIVEDFIDCOLETA,
          DFIDTANQUE,
          collectItems: collectItems[collectItem],
          db,
        });
        if (response !== false) {
          updateCollectdCollectItemCount += 1;
          const storeMouthResponse = await upsertStoredMouth({
            DFIDITEMCOLETAAPP,
            DFIDITEMCOLETA: Number(response),
            storedMouths,
          });
          if (storeMouthResponse === true) {
            upsertStoredMoutCount += 1;
          }
          const storeProducerCollect = await upsertProducerCollect({
            DFIDITEMCOLETAAPP: Number(DFIDITEMCOLETAAPP),
            DFIDITEMCOLETA: Number(response),
            producerCollects,
          });
          if (storeProducerCollect === true) {
            upsertProducerCollectCount += 1;
          }
          const storeRegister = await createRegisterWithItemRegister({
            db,
            DFIDCOLETA: RECEIVEDFIDCOLETA,
            DFIDCOLETAAPP: String(DFIDCOLETAAPP),
            DFIDITEMCOLETA: String(response),
            DFIDITEMCOLETAAPP: String(DFIDITEMCOLETAAPP),
            registerCollects,
            registerItemCollect,
          });
          if (storeRegister === true) {
            createRegisterItemCount += 1;
          }
        } else {
          resolve(false);
          return false;
        }
      }
    }
    if (
      upsertStoredMoutCount === collectItems.length &&
      upsertProducerCollectCount === collectItems.length &&
      collectItems.length === updateCollectdCollectItemCount &&
      hasCreatedRegister === true
    ) {
      resolve(true);
      return true;
    }
    resolve(false);
    return false;
  });
};

const syncronizeUpdateCollect = async ({
  collect,
  db,
  DFIDCOLETA,
  tables,
}: ICollectID) => {
  return new Promise(resolve => {
    return updateCollect({ collect })
      .then(async res => {
        if (res === true) {
          return syncronizeCollect({
            collect,
            db,
            DFIDCOLETA,
            tables,
          })
            .then(res => {
              if (res === true) {
                resolve(true);
                return true;
              }
            })
            .catch(() => {
              resolve(false);
              return false;
            });
        }
        resolve(false);
        return false;
      })
      .catch(res => {
        resolve(false);
        return false;
      });
  });
};

const syncronizeCreateCollect = async ({ collect, db, tables }: ICollect) => {
  return new Promise(resolve => {
    return createCollect({ collect })
      .then(res => {
        if (res) {
          return syncronizeCollect({
            collect,
            db,
            DFIDCOLETA: String(res),
            tables,
          })
            .then(res => {
              if (res === true) {
                resolve(true);
                return true;
              }
            })
            .catch(() => {
              resolve(false);
              return false;
            });
        }
        resolve(false);
        return false;
      })
      .catch(() => {
        resolve(false);
        return false;
      });
  });
};

const validCollectWithoutId = async ({
  collect,
  db,
  tables,
}: ICollect): Promise<boolean> => {
  return new Promise(resolve => {
    return getCollect({ collect })
      .then(res => {
        if (res.DFIDCOLETA) {
          return syncronizeCollect({
            collect,
            db,
            DFIDCOLETA: String(res.DFIDCOLETA),
            tables,
          })
            .then(res => {
              if (res === true) {
                resolve(true);
                return true;
              }
              resolve(false);
              return false;
            })
            .catch(() => {
              resolve(false);
              return false;
            });
        }
        return syncronizeCreateCollect({ collect, db, tables })
          .then(res => {
            if (res === true) {
              resolve(true);
              return true;
            }
            resolve(false);
            return false;
          })
          .catch(() => {
            resolve(false);
            return false;
          });
      })
      .catch(() => {
        resolve(false);
        return false;
      });
  });
};

const updateSynchronizeStatus = async ({
  data,
}: IDataUpdateSynchronizeStatus) => {
  const { isSynchronized, DFIDCARRETEIRO } = data;
  await AsyncStorage.setItem(
    'META_COLLECT_SYNCHRONIZED',
    JSON.stringify({ isSynchronized }),
  );
  if (DFIDCARRETEIRO) {
    const db = await getDBConnection();
    await updateDataAfterSynchronization({
      db,
      DFDATASINCRONIZACAO: currentDate(),
      DFHORASINCRONIZACAO: currentTime(),
      DFIDCARRETEIRO,
    });
  }
};

const getSynchronizeStatus = (): Promise<boolean> => {
  return new Promise(async resolve => {
    const response = await AsyncStorage.getItem('META_COLLECT_SYNCHRONIZED');
    if (response) {
      const sync = JSON.parse(response);
      resolve(sync.isSynchronized);
      return JSON.parse(sync.isSynchronized);
    }
  });
};

export {
  syncronizeUpdateCollect,
  validCollectWithoutId,
  updateSynchronizeStatus,
  getSynchronizeStatus,
};
