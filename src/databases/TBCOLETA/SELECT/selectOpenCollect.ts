import { Dispatch, SetStateAction } from 'react';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Collect } from '../../../types/collect';

interface ISearchCollect {
  db: SQLiteDatabase;
}

const selectOpenCollect = ({
  db,
}: ISearchCollect): Promise<Collect[] | boolean> => {
  const querySelect = `
  SELECT 
  DFIDCOLETA,
  DFIDCOLETAERP,
  DFIDCOLETAAPP,
  DFORDEMCOLETA,
  DFIDCARRETEIRO,
  DFIDLINHA,
  DFIDVEICULO,
  DFIDREGIONAL,
  DFDATACOLETA,
  DFDATASAIDA,
  DFHORACOLETA,
  DFHORASAIDA,
  DFIMEI,
  DFSTATUS,
  DFKMINICIAL,
  DFDATAPROGRAMADA
  FROM TBCOLETA WHERE DFSTATUS = 'A' LIMIT 1; 
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [], (_, results) => {
          resolve(results.rows.raw() as Collect[]);
          return results.rows.raw();
        });
      });
    } catch (error) {
      resolve(false);
    }
  });
};

export { selectOpenCollect };
