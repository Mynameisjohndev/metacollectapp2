import { Dispatch, SetStateAction } from 'react';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Line } from '../../../types/line';

interface IGETTbLinha extends Line {
  db: SQLiteDatabase;
  setLoadingListLine: Dispatch<SetStateAction<boolean>>;
}
const selectTbLinha = async ({
  db,
  DFIDREGIONAL,
  setLoadingListLine,
}: IGETTbLinha): Promise<Line[]> => {
  const querySelect = `
    SELECT DFIDLINHA, DFNOMELINHA FROM TBLINHA WHERE DFIDREGIONAL = ? ORDER BY DFNOMELINHA;
  `;
  return new Promise(resolve => {
    try {
      setLoadingListLine(true);
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDREGIONAL], (_, results) => {
          setLoadingListLine(false);
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

export { selectTbLinha };
