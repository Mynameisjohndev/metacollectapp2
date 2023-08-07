/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-await-in-loop */
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Collect } from '../../../types/collect';
import { currentDate } from '../../../utils/getCurrentDate';
import { selectCollecItemOfAScheduledCollect } from '../../TBITEMCOLETA/SELECT/selectCollecItemOfAScheduledCollect';
import { searchInformationAndCreateCollectProducer } from '../../TBPRODUTORCOLETA/SELECT/searchInformationAndCreateCollectProducer';
import { insertNewCollect } from '../INSERT/InsertNewCollect';

interface ISelectSearchCollect extends Collect {
  db: SQLiteDatabase;
}

const selectSearchCollect = async ({
  db,
  DFIDVEICULO,
  DFIDREGIONAL,
  DFIDLINHA,
  DFKMINICIAL,
  DFIMEI,
  DFIDCARRETEIRO,
}: ISelectSearchCollect): Promise<boolean> => {
  const querySelect = `
  SELECT DFIDCOLETAAPP FROM TBCOLETA WHERE DFIDVEICULO = ? AND DFIDREGIONAL = ? AND DFIDLINHA = ? AND DFSTATUS = 'P' LIMIT 1;
  `;

  const queryUpadte = `
   UPDATE TBCOLETA SET DFSTATUS='A', DFIMEI = ?, DFKMINICIAL = ? WHERE DFIDCOLETAAPP = ?;
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          querySelect,
          [DFIDVEICULO, DFIDREGIONAL, DFIDLINHA],
          (tx, results) => {
            if (results.rows.length > 0) {
              tx.executeSql(
                queryUpadte,
                [DFIMEI, DFKMINICIAL, results.rows.item(0).DFIDCOLETAAPP],
                async (_, { rowsAffected }) => {
                  if (rowsAffected > 0) {
                    const { DFIDCOLETAAPP } = results.rows.item(0);
                    const collectItemIds =
                      await selectCollecItemOfAScheduledCollect({
                        db,
                        DFIDCOLETAAPP,
                      });
                    let countCreateProducer = 0;
                    for (let i in collectItemIds) {
                      const result =
                        await searchInformationAndCreateCollectProducer({
                          db,
                          DFIDCOLETAAPP,
                          DFIDITEMCOLETAAPP: Number(
                            collectItemIds[i].DFIDITEMCOLETAAPP,
                          ),
                        });
                      if (result) countCreateProducer += 1;
                    }
                    if (countCreateProducer === collectItemIds.length) {
                      // console.log('erro ');
                      resolve(true);
                      return true;
                    }
                  }
                  // console.log('erro 1');
                  resolve(false);
                  return false;
                },
              );
            } else {
              insertNewCollect({
                db,
                DFIDCARRETEIRO,
                DFIDLINHA,
                DFIDVEICULO,
                DFIDREGIONAL,
                DFSTATUS: 'A',
                DFKMINICIAL,
                DFIMEI,
                DFDATAPROGRAMADA: currentDate(),
              })
                .then(() => {
                  resolve(true);
                  return true;
                })
                .catch(() => {
                  resolve(false);
                  return false;
                });
            }
          },
        );
      });
    } catch (_) {
      resolve(false);
      return false;
    }
  });
};

export { selectSearchCollect };
