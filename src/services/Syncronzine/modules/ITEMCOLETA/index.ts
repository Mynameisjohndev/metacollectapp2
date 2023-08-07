import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { META_COLLECT_API } from '../../../../api';
import { updateTbItemColetaSyncronzine } from '../../../../databases/TBITEMCOLETA/UPDATE/updateTbItemColetaSyncronzine';
import { CollectItem } from '../../../../types/collectItem';

interface IUpsertCollectItem {
  DFIDCOLETA: string | number;
  DFIDTANQUE: string | number;
  collectItems?: CollectItem;
  db: SQLiteDatabase;
}
interface IUpdateCollectItemNotSynchronized {
  selectedCollectItem: CollectItem;
  DFIDCOLETA: string;
  DFIDITEMCOLETA: string;
}

interface ICreateAllCollectItems {
  selectedCollectItem: CollectItem;
  DFIDCOLETA: string | number;
}

const updateCollectItem = (
  selectedCollectItem: CollectItem,
): Promise<boolean> => {
  return new Promise(resolve => {
    META_COLLECT_API.patch(`/itemcoleta/atualizar/mobile`, selectedCollectItem)
      .then(_ => {
        resolve(true);
        return true;
      })
      .catch(_ => {
        resolve(false);
        return false;
      });
  });
};

const createAllCollectItems = ({
  DFIDCOLETA,
  selectedCollectItem,
}: ICreateAllCollectItems): Promise<boolean> => {
  return new Promise(resolve => {
    try {
      META_COLLECT_API.post(`itemcoleta/criar/mobile`, {
        ...selectedCollectItem,
        DFIDCOLETA,
      })
        .then(id => {
          resolve(id.data.id);
          return id.data.id;
        })
        .catch(() => {
          resolve(false);
          return false;
        });
    } catch (error) {
      resolve(false);
      return false;
    }
  });
};

const updateCollectItemNotSynchronized = ({
  DFIDCOLETA,
  DFIDITEMCOLETA,
  selectedCollectItem,
}: IUpdateCollectItemNotSynchronized): Promise<boolean> => {
  return new Promise(resolve => {
    META_COLLECT_API.patch(`/itemcoleta/atualizar/mobile`, {
      ...selectedCollectItem,
      DFIDCOLETA,
      DFIDITEMCOLETA,
    })
      .then(_ => {
        resolve(true);
        return true;
      })
      .catch(error => {
        resolve(false);
        return false;
      });
  });
};

const upsertCollectItem = ({
  DFIDCOLETA,
  DFIDTANQUE,
  collectItems,
  db,
}: IUpsertCollectItem): Promise<boolean> => {
  return new Promise(resolve => {
    try {
      META_COLLECT_API.get(
        `/itemcoleta/filtrar/mobile?DFIDCOLETA=${DFIDCOLETA}&DFIDTANQUE=${DFIDTANQUE}`,
      ).then(res => {
        if (res.data.itens[0]) {
          const { DFIDITEMCOLETA, DFIDCOLETA } = res.data.itens[0];
          updateCollectItemNotSynchronized({
            DFIDCOLETA,
            DFIDITEMCOLETA,
            selectedCollectItem: collectItems,
          }).then(res => {
            if (res === true) {
              updateTbItemColetaSyncronzine({
                db,
                DFIDCOLETA,
                DFIDITEMCOLETA,
                DFIDTANQUE,
                DFIDITEMCOLETAAPP: collectItems.DFIDITEMCOLETAAPP,
              });
              resolve(DFIDITEMCOLETA);
              return DFIDITEMCOLETA;
            }
          });
        } else {
          createAllCollectItems({
            DFIDCOLETA,
            selectedCollectItem: collectItems,
          }).then(id => {
            if (id !== false) {
              updateTbItemColetaSyncronzine({
                db,
                DFIDCOLETA: String(DFIDCOLETA),
                DFIDITEMCOLETA: String(id),
                DFIDTANQUE,
                DFIDITEMCOLETAAPP: collectItems.DFIDITEMCOLETAAPP,
              });
              resolve(id);
              return id;
            }
          });
        }
      });
    } catch (error) {
      resolve(false);
      return false;
    }
  });
};

export { upsertCollectItem };

export { updateCollectItem };
