import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { SumOfStorage } from '../../../types/sumOfStorage';

interface ISumOfStorage extends SumOfStorage {
  db: SQLiteDatabase;
}
const sumOfStorage = ({
  db,
  DFIDCOLETAAPP,
  DFBOCA,
}: ISumOfStorage): Promise<SumOfStorage[]> => {
  const query = `
  SELECT SUM(ba.DFVOLUME) AS DFVOLUME
  FROM TBITEMCOLETA AS ict
  LEFT JOIN TBCOLETA AS co ON co.DFIDCOLETAAPP = ict.DFIDCOLETAAPP
  LEFT JOIN TBBOCAARMAZENADA AS ba ON ba.DFIDITEMCOLETAAPP = ict.DFIDITEMCOLETAAPP 
  WHERE ict.DFIDCOLETAAPP = ? AND ba.DFBOCA = ?
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDCOLETAAPP, DFBOCA], (tx, results) => {
          if (results.rows.length > 0) {
            const list = [];
            for (let i = 0; i <= results.rows.length - 1; i += 1) {
              list.push(results.rows.item(i));
            }
            resolve(list);
            return list;
          }
          return null;
        });
      });
    } catch (error) {}
  });
};

export { sumOfStorage };
