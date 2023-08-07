/* eslint-disable no-unreachable-loop */
/* eslint-disable no-await-in-loop */
import { Dispatch, SetStateAction } from 'react';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { TbItemsCollectCreateApp } from '../../../types/tbItemsCollectCreateApp';
import { searchInformationAndCreateCollectProducer } from '../../TBPRODUTORCOLETA/SELECT/searchInformationAndCreateCollectProducer';
import { insertCollectItem } from '../INSERT/appTbItemColeta';

interface ISelectTankAndCreateCollectItem extends TbItemsCollectCreateApp {
  db: SQLiteDatabase;
  setLoadingCollect?: Dispatch<SetStateAction<boolean>>;
}
interface IResponseIdTanque {
  DFIDTANQUE?: number;
}
const selectTankAndCreateCollectItem = ({
  db,
  DFIDLINHA,
  DFIDCOLETAAPP,
}: ISelectTankAndCreateCollectItem): Promise<boolean> => {
  const querySelect = `
    SELECT DFIDTANQUE FROM TBTANQUE WHERE DFIDLINHA = ?;
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDLINHA], async (tx, results) => {
          if (results.rows.length > 0) {
            const list: IResponseIdTanque[] = results.rows.raw();
            let insertedCollectItem = 0;
            for (let i = 0; i <= list.length - 1; i += 1) {
              const resultInsert = await insertCollectItem({
                db,
                DFIDCOLETAAPP: Number(DFIDCOLETAAPP),
                DFIDTANQUE: list[i].DFIDTANQUE,
              });
              const { created, DFIDITEMCOLETAAPP } = resultInsert;
              if (created === true) {
                await searchInformationAndCreateCollectProducer({
                  db,
                  DFIDCOLETAAPP: Number(DFIDCOLETAAPP),
                  DFIDITEMCOLETAAPP,
                });
                insertedCollectItem += 1;
              }
            }
            if (list.length === insertedCollectItem) {
              resolve(true);
              return true;
            }
            resolve(false);
            return false;
          }
        });
      });
    } catch (error) {
      resolve(false);
      return false;
    }
  });
};

export { selectTankAndCreateCollectItem };
