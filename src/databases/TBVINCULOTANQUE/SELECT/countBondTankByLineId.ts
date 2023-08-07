import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface ICountBondTankByLineId {
  db: SQLiteDatabase;
  DFIDLINHA: number;
}
const countBondTankByLineId = ({
  db,
  DFIDLINHA,
}: ICountBondTankByLineId): Promise<number> => {
  const sql = `
      SELECT COUNT(DISTINCT ta.DFIDTANQUE) AS COUNT
      FROM TBTANQUE as ta
      INNER JOIN TBVINCULOTANQUE as vt ON vt.DFIDTANQUE = ta.DFIDTANQUE
      WHERE DFIDLINHA = ? AND DFPROPRIETARIO = "S" AND ta.DFATIVO="S"
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(sql, [DFIDLINHA], (_, results) => {
          const { count } = results.rows.raw()[0];
          resolve(count);
          return count;
        });
      });
    } catch (_) {
      resolve(0);
      return 0;
    }
  });
};

export { countBondTankByLineId };
