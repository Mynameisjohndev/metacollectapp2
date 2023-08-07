/* eslint-disable no-loop-func */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-async-promise-executor */
import { Dispatch, SetStateAction } from 'react';
/* eslint-disable no-await-in-loop */

import { getDBConnection } from '../../../databases/conection';
import { searchTbBocaArmazenadaApi } from '../../../databases/TBBOCAARMAZENADA/SELECT/searchTbBocaArmazenadaApi';
import { selectOpenCollect } from '../../../databases/TBCOLETA/SELECT/selectOpenCollect';
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
import {
  syncronizeUpdateCollect,
  updateSynchronizeStatus,
  validCollectWithoutId,
} from '../services';

interface ISyncronizeOpenCollect {
  collect: Collect;
  setVisible: Dispatch<SetStateAction<boolean>>;
  isTask?: boolean;
}

let collectItems: CollectItem[] = [];
let storedMouths: StoredMouth[] = [];
let producerCollects: ProducerCollect[] = [];
let registerCollects: Register[] = [];
let registerItemCollect: RegisterItemDb[] = [];
let myCollect: Collect;

const syncronizeOpenCollect = async ({
  setVisible,
  collect,
  isTask,
}: ISyncronizeOpenCollect) => {
  const { DFIDCOLETAAPP, DFIDCARRETEIRO } = collect;
  if (isTask) {
    updateSynchronizeStatus({ data: { isSynchronized: false } });
  }

  const executeSaveStatusSynchronized = () => {
    if (isTask) {
      updateSynchronizeStatus({
        data: {
          isSynchronized: true,
          DFIDCARRETEIRO: Number(DFIDCARRETEIRO),
        },
      });
    }
  };

  const db = await getDBConnection();
  const params = {
    db,
    DFIDCOLETAAPP,
  };

  setVisible(true);
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
              selectOpenCollect({ db }).then((res: Collect[]) => {
                myCollect = res[0];
                const data = {
                  collect: res[0],
                  db,
                  DFIDCOLETA: String(res[0].DFIDCOLETA),
                  tables: {
                    collectItems,
                    storedMouths,
                    producerCollects,
                    registerCollects,
                    registerItemCollect,
                  },
                };
                if (res[0].DFIDCOLETA) {
                  return syncronizeUpdateCollect(data).then(res => {
                    if (res === true) {
                      executeSaveStatusSynchronized();
                      resolve(true);
                      return true;
                    }
                    setVisible(false);
                    resolve(false);
                    return false;
                  });
                }
                return validCollectWithoutId(data).then(res => {
                  if (res === true) {
                    executeSaveStatusSynchronized();
                    resolve(true);
                    return true;
                  }
                  setVisible(false);
                  resolve(false);
                  return false;
                });
              });
            });
          });
        });
      });
    });
  });
};

export { syncronizeOpenCollect };
