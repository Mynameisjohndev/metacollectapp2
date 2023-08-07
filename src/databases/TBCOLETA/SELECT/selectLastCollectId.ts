import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface ISearchCollect {
  db: SQLiteDatabase;
  DFIDCARRETEIRO: number;
}

const selectLastCollectId = ({
  db,
  DFIDCARRETEIRO,
}: ISearchCollect): Promise<number | null> => {
  const querySelect = `
  SELECT co.DFIDCOLETA
  FROM TBCOLETA AS co 
  WHERE co.DFIDCARRETEIRO = ?
  ORDER BY co.DFIDCOLETA DESC
  LIMIT 1;
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDCARRETEIRO], (_, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows.item(0).DFIDCOLETA);
            return results.rows.item(0).DFIDCOLETA;
          }
          resolve(null);
          return null;
        });
      });
    } catch (error) {
      resolve(null);
      return null;
    }
  });
};

export { selectLastCollectId };
