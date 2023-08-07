import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Carreteiro } from '../../../types/wagoner';

interface IGETTbCarreteiro extends Carreteiro {
  db: SQLiteDatabase;
}
const selectTbCarreteiroMyCollect = async ({
  db,
  DFIDCARRETEIRO,
}: IGETTbCarreteiro): Promise<Carreteiro[]> => {
  const querySelect = `
    SELECT DFNOMECARRETEIRO FROM TBCARRETEIRO WHERE DFIDCARRETEIRO = ?;
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDCARRETEIRO], (_, results) => {
          const list: Carreteiro[] = [];
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

export { selectTbCarreteiroMyCollect };
