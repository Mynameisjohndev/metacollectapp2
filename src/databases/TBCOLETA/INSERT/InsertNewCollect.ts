import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Collect } from '../../../types/collect';
import { selectTankAndCreateCollectItem } from '../../TBITEMCOLETA/SELECT/selectTankAndCreateCollectItem';

interface IInsertNewCollect extends Collect {
  db: SQLiteDatabase;
}

const insertNewCollect = async ({
  db,
  DFIDCARRETEIRO,
  DFIDLINHA,
  DFIDVEICULO,
  DFIDREGIONAL,
  DFSTATUS,
  DFKMINICIAL,
  DFIMEI,
  DFDATAPROGRAMADA,
}: IInsertNewCollect): Promise<boolean> => {
  const queryInsert = `
  INSERT INTO TBCOLETA (
    DFORDEMCOLETA, 
    DFIDCARRETEIRO,
    DFIDLINHA,
    DFIDVEICULO,
    DFIDREGIONAL,
    DFSTATUS,
    DFKMINICIAL,
    DFIMEI,
    DFDATAPROGRAMADA
  )
  SELECT 
    COALESCE(MAX(DFORDEMCOLETA), 0) + 1,
    ?,?,?,?,?,?,?,?
  FROM (
    SELECT DFORDEMCOLETA
    FROM TBCOLETA
    ORDER BY DFORDEMCOLETA DESC
    LIMIT 1
  ) AS t;
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [
            DFIDCARRETEIRO,
            DFIDLINHA,
            DFIDVEICULO,
            DFIDREGIONAL,
            DFSTATUS,
            DFKMINICIAL,
            DFIMEI,
            DFDATAPROGRAMADA,
          ],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              const { insertId } = results;
              selectTankAndCreateCollectItem({
                db,
                DFIDLINHA,
                DFIDCOLETAAPP: insertId,
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
          },
          (_, error) => {
            resolve(false);
            return false;
          },
        );
      });
    } catch (error) {
      resolve(false);
      return false;
    }
  });
};

export { insertNewCollect };
