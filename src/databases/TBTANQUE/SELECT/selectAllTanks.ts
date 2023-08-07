import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Tank } from '../../../types/tank';

interface ISelectAllTanks {
  db: SQLiteDatabase;
}
const selectAllTanks = async ({ db }: ISelectAllTanks): Promise<Tank[]> => {
  const queryTank = 'SELECT * FROM TBTANQUE';
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(queryTank, [], (_, results) => {
          const tanks = results.rows.raw();
          resolve(tanks);
          return tanks;
        });
      });
    } catch (error) {
      resolve(undefined);
      return undefined;
    }
  });
};
export { selectAllTanks };
