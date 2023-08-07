import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface ICountTankByLineId {
  db: SQLiteDatabase;
  DFIDLINHA: number;
}
const countTankByLineId = ({
  db,
  DFIDLINHA,
}: ICountTankByLineId): Promise<number> => {
  const querySelect = `
    SELECT COUNT(*) AS COUNT
      FROM TBTANQUE
      WHERE DFIDLINHA = ? AND DFATIVO="S"
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDLINHA], (_, results) => {
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

export { countTankByLineId };
