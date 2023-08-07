import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface ICounttBondTankByCollectItemId {
  db: SQLiteDatabase;
  DFIDCOLETAAPP: number;
}
const counttBondTankByCollectItemId = ({
  db,
  DFIDCOLETAAPP,
}: ICounttBondTankByCollectItemId): Promise<number> => {
  const sql = `
    SELECT COUNT(*) as count FROM TBITEMCOLETA as itc
    INNER JOIN TBTANQUE as ta ON ta.DFIDTANQUE = itc.DFIDTANQUE
    INNER JOIN TBVINCULOTANQUE as vt ON vt.DFIDTANQUE = itc.DFIDTANQUE
    WHERE DFIDCOLETAAPP = ? AND DFPROPRIETARIO = "S"
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(sql, [DFIDCOLETAAPP], (_, results) => {
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

export { counttBondTankByCollectItemId };
