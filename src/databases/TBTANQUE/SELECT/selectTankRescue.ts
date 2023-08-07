import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { tankListItem } from '../../../types/tankListItem';

interface ISelectTankRescue {
  db: SQLiteDatabase;
  DFIDLINHA: number;
}
const selectTankRescue = async ({
  db,
  DFIDLINHA,
}: ISelectTankRescue): Promise<tankListItem[]> => {
  const query = `
  SELECT tq.DFDESCTANQUE, tq.DFIDTANQUE
  FROM TBTANQUE AS tq
  INNER JOIN TBVINCULOTANQUE AS vt ON vt.DFIDTANQUE = tq.DFIDTANQUE AND vt.DFPROPRIETARIO = "S"
  WHERE tq.DFIDLINHA = ?
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDLINHA], (_, results) => {
          const list = [];
          for (let i = 0; i <= results.rows.length - 1; i += 1) {
            list.push(results.rows.item(i));
          }
          resolve(list);
          return list;
        });
      });
    } catch (error) {}
  });
};
export { selectTankRescue };
