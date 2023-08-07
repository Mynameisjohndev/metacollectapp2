import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Property } from '../../../types/property';

interface IGETTbProperty {
  db: SQLiteDatabase;
}
const selectTbProperty = async ({
  db,
}: IGETTbProperty): Promise<Property[]> => {
  const querySelect = `
    SELECT DFNOMEPRODUTOR, DFIDPROPRIEDADE FROM TBPROPRIEDADE ORDER BY DFNOMEPRODUTOR
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [], (_, results) => {
          const list: Property[] = [];
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

export { selectTbProperty };
