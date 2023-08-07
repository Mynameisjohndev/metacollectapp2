import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Region } from '../../../types/region';

interface IGETTbRegional extends Region {
  db: SQLiteDatabase;
}
const selectTbRegionalMyCollect = async ({
  db,
  DFIDREGIONAL,
}: IGETTbRegional): Promise<Region[]> => {
  const querySelect = `
    SELECT DFDESCREGIONAL FROM TBREGIONAL WHERE DFIDREGIONAL = ?;
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDREGIONAL], (_, results) => {
          const list: Region[] = [];
          for (let i = 0; i <= results.rows.length - 1; i += 1) {
            list.push(results.rows.item(i));
          }
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

export { selectTbRegionalMyCollect };
