import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface IValidExisTankBond {
  db: SQLiteDatabase;
  DFIDTANQUE: number;
}

const validExisTankBond = async ({
  db,
  DFIDTANQUE,
}: IValidExisTankBond): Promise<boolean> => {
  const queryTank = 'SELECT * FROM TBVINCULOTANQUE WHERE DFIDTANQUE = ?';
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(queryTank, [DFIDTANQUE], (_, results) => {
          const bonds = results.rows.raw();
          if (bonds.length > 0) {
            resolve(true);
            return true;
          }
          resolve(false);
          return false;
        });
      });
    } catch (error) {
      resolve(false);
      return false;
    }
  });
};
export { validExisTankBond };
