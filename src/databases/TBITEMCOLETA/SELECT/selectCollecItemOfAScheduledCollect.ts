import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../types/collectItem';

interface ISearchTbItemColetaApi {
  db: SQLiteDatabase;
  DFIDCOLETAAPP: number;
}
const selectCollecItemOfAScheduledCollect = ({
  db,
  DFIDCOLETAAPP,
}: ISearchTbItemColetaApi): Promise<CollectItem[]> => {
  const querySelect = `
  SELECT DFIDITEMCOLETAAPP
  FROM TBITEMCOLETA
  WHERE DFIDCOLETAAPP = ?
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDCOLETAAPP], (tx, results) => {
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

export { selectCollecItemOfAScheduledCollect };
