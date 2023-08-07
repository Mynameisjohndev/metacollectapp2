import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Line } from '../../../types/line';

interface IGETTbLine extends Line {
  db: SQLiteDatabase;
}
const selectTbLinhaMyCollect = async ({
  db,
  DFIDLINHA,
}: IGETTbLine): Promise<Line[]> => {
  const querySelect = `
    SELECT DFNOMELINHA FROM TBLINHA WHERE DFIDLINHA = ?;
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDLINHA], (_, results) => {
          const list: Line[] = [];
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

export { selectTbLinhaMyCollect };
