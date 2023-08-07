import { Dispatch, SetStateAction } from 'react';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Collect } from '../../../types/collect';

interface ISearchCollect {
  db: SQLiteDatabase;
}

const selectValidateSignout = ({
  db,
}: ISearchCollect): Promise<Collect[] | boolean> => {
  const querySelect = `
  SELECT * FROM TBCOLETA AS co
  WHERE  co.DFSTATUS = "A"  
  OR (co.DFSTATUS = "D" AND co.DFCOLETASICRONIZADA = "N" )
  
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

export { selectValidateSignout };
