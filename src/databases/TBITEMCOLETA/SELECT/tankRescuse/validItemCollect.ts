import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface IValidItemCollect {
  db: SQLiteDatabase;
  DFIDCOLETAAPP: number;
  DFIDTANQUE: number;
}
const validItemCollect = async ({
  db,
  DFIDCOLETAAPP,
  DFIDTANQUE,
}: IValidItemCollect): Promise<boolean> => {
  const query = `
  SELECT * FROM TBITEMCOLETA AS ict WHERE ict.DFIDCOLETAAPP = ? AND ict.DFIDTANQUE = ?
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDCOLETAAPP, DFIDTANQUE], (_, results) => {
          if (results.rows.length > 0) {
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

export { validItemCollect };
