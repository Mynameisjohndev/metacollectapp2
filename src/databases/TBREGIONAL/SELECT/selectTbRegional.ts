import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Region } from '../../../types/region';

interface IGETTbRegional {
  db: SQLiteDatabase;
}
const selectTbRegional = async ({ db }: IGETTbRegional): Promise<Region[]> => {
  const querySelect = `
    SELECT * FROM  TBREGIONAL ORDER BY DFDESCREGIONAL
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [], (_, results) => {
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

export { selectTbRegional };
