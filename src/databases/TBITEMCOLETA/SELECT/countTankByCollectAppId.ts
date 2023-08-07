import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface ISearchTbItemColeta {
  db: SQLiteDatabase;
  DFIDCOLETAAPP: number;
}
const countTankByCollectAppId = ({
  db,
  DFIDCOLETAAPP,
}: ISearchTbItemColeta): Promise<number> => {
  const querySelect = `
    SELECT COUNT(*) as count FROM TBITEMCOLETA as itc
    INNER JOIN TBTANQUE as ta ON ta.DFIDTANQUE = itc.DFIDTANQUE
    WHERE DFIDCOLETAAPP = ?
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDCOLETAAPP], (_, results) => {
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

export { countTankByCollectAppId };
