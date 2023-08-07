import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Tank } from '../../../types/tank';

interface ISelectReadTank {
  db: SQLiteDatabase;
  DFIDTANQUE: number;
}
const selectTankById = async ({
  db,
  DFIDTANQUE,
}: ISelectReadTank): Promise<Tank> => {
  const queryTank = `SELECT * FROM TBTANQUE WHERE DFIDTANQUE = ?`;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(queryTank, [DFIDTANQUE], (_, results) => {
          const tank = results.rows.item(0);
          resolve(tank);
          return tank;
        });
      });
    } catch (error) {
      resolve(undefined);
      return undefined;
    }
  });
};
export { selectTankById };
