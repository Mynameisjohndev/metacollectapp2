/* eslint-disable no-loop-func */
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { META_COLLECT_API } from '../../../../api';
import { updateRegisterItemById } from '../../../../databases/TBITEMREGISTRO/UPDATE/updateRegisterItemById';
import { RegisterItemDb } from '../../../../types/registerItemDb';

interface ICreateAllItemRegister {
  DFIDREGISTROAPP: string | number;
  DFIDREGISTRO: string | number;
  registerItemCollect: RegisterItemDb[];
  db: SQLiteDatabase;
}

let countRegisterItemStatusN = 0;

const createItemRegister = ({
  DFIDREGISTRO,
  DFIDREGISTROAPP,
  registerItemCollect,
  db,
}: ICreateAllItemRegister): Promise<boolean> => {
  return new Promise(resolve => {
    if (registerItemCollect.length > 0) {
      const filteredRegisterItem: RegisterItemDb[] = registerItemCollect.filter(
        item =>
          item.DFITEMREGISTROENVIADO === 'N' &&
          item.DFIDREGISTROAPP === DFIDREGISTROAPP,
      );
      if (filteredRegisterItem.length > 0) {
        for (let filter in filteredRegisterItem) {
          let selectedRegisterItem: RegisterItemDb =
            filteredRegisterItem[filter];
          META_COLLECT_API.post(`/itemregistro/criar`, {
            ...selectedRegisterItem,
            DFIDREGISTRO,
            DFITEMREGISTROENVIADO: 'S',
          })
            .then(_ => {
              updateRegisterItemById({ db, DFIDREGISTROAPP, DFIDREGISTRO });
              countRegisterItemStatusN += 1;
              if (filteredRegisterItem.length === countRegisterItemStatusN) {
                resolve(true);
                return true;
              }
            })
            .catch(_ => {
              resolve(false);
              return false;
            });
        }
      } else {
        resolve(true);
        return true;
      }
    } else {
      resolve(true);
      return true;
    }
  });
};

export { createItemRegister };
