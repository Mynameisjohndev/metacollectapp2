/* eslint-disable no-async-promise-executor */
/* eslint-disable no-await-in-loop */
import { Dispatch, SetStateAction } from 'react';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { getDBConnection } from '../../../databases/conection/index';
import { searchTbBocaArmazenadaApi } from '../../../databases/TBBOCAARMAZENADA/SELECT/searchTbBocaArmazenadaApi';
import { searchTbItemColetaApi } from '../../../databases/TBITEMCOLETA/SELECT/searchTbItemColetaApi';
import { searchTbItemRegistroApi } from '../../../databases/TBITEMREGISTRO/SELECT/searchTbItemRegistroApi';
import { searchTbProdutorColetaApi } from '../../../databases/TBPRODUTORCOLETA/SELECT/searchTbProdutorColetaApi';
import { searchTbRegistroApi } from '../../../databases/TBREGISTRO/SELECT/searchTbRegistroApi';
import { Collect } from '../../../types/collect';
import { CollectItem } from '../../../types/collectItem';
import { ProducerCollect } from '../../../types/producerCollect';
import { Register } from '../../../types/register';
import { RegisterItemDb } from '../../../types/registerItemDb';
import { StoredMouth } from '../../../types/storedMouth';
import { syncronizeUpdateCollect, validCollectWithoutId } from '../services';

interface ISyncronizeDischargeCollects {
  dischargeCollects: Collect[];
  setVisible: Dispatch<SetStateAction<boolean>>;
}
interface IValidDischargeCollect {
  collect: Collect;
  db: SQLiteDatabase;
}

const validDischargeCollect = async ({
  db,
  collect,
}: IValidDischargeCollect) => {
  let collectItems: CollectItem[] = [];
  let storedMouths: StoredMouth[] = [];
  let producerCollects: ProducerCollect[] = [];
  let registerCollects: Register[] = [];
  let registerItemCollect: RegisterItemDb[] = [];
  const { DFIDCOLETA, DFIDCOLETAAPP } = collect;

  const params = {
    db,
    DFIDCOLETAAPP,
  };

  return new Promise(resolve => {
    searchTbItemColetaApi(params).then(async res => {
      collectItems = res;
      searchTbBocaArmazenadaApi(params).then(async res => {
        storedMouths = res;
        searchTbProdutorColetaApi(params).then(async res => {
          producerCollects = res;
          searchTbRegistroApi(params).then(async res => {
            registerCollects = res;
            searchTbItemRegistroApi(params).then(async res => {
              registerItemCollect = res;
              const data = {
                collect,
                db,
                DFIDCOLETA: String(collect.DFIDCOLETA),
                tables: {
                  collectItems,
                  storedMouths,
                  producerCollects,
                  registerCollects,
                  registerItemCollect,
                },
              };
              if (DFIDCOLETA) {
                return syncronizeUpdateCollect(data).then(res => {
                  if (res === true) {
                    resolve(true);
                    return true;
                  }
                  // setVisible(false);
                  resolve(false);
                  return false;
                });
              }
              return validCollectWithoutId(data).then(res => {
                if (res === true) {
                  resolve(true);
                  return true;
                }
                // setVisible(false);
                resolve(false);
                return false;
              });
            });
          });
        });
      });
    });
  });
};

const syncronizeDischargeCollects = async ({
  dischargeCollects,
  setVisible,
}: ISyncronizeDischargeCollects) => {
  setVisible(true);
  let dischargeCollectUpdate = 0;
  setVisible(true);
  const db = await getDBConnection();
  return new Promise(async resolve => {
    try {
      for (let collect in dischargeCollects) {
        const responseSynchronize = await validDischargeCollect({
          collect: dischargeCollects[collect],
          db,
        });
        if (responseSynchronize === true) {
          dischargeCollectUpdate += 1;
        }
      }
      if (dischargeCollectUpdate === dischargeCollects.length) {
        // setVisible(false);
        resolve(true);
        return true;
      }
      resolve(false);
      return false;
    } catch (_) {
      resolve(false);
      return false;
    }
  });
};

export { syncronizeDischargeCollects };
