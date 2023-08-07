import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { RegisterItemDb } from '../../../types/registerItemDb';

interface ISearchTbItemColeta extends RegisterItemDb {
  db: SQLiteDatabase;
}
const searchTbItemRegistro = ({
  db,
  DFIDREGISTROAPP,
}: ISearchTbItemColeta): Promise<RegisterItemDb[]> => {
  const querySelect = `
  SELECT DFREGISTROIMAGEM, DFIDREGISTROAPP, DFIDITEMREGISTROAPP
  FROM TBITEMREGISTRO
  WHERE DFIDREGISTROAPP = ?;
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDREGISTROAPP], (tx, results) => {
          const list = results.rows.raw();
          resolve(list);
          return list;
        });
      });
    } catch (error) {
      resolve([]);
      return [];
    }
  });
};

export { searchTbItemRegistro };
