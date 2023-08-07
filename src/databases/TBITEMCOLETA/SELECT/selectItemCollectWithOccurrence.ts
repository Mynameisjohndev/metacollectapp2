import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface ISelectItemCollectWithOccurrence {
  db: SQLiteDatabase;
  DFIDITEMCOLETAAPP: number;
}
const selectItemCollectWithOccurrence = ({
  db,
  DFIDITEMCOLETAAPP,
}: ISelectItemCollectWithOccurrence): Promise<boolean> => {
  const query = `
  SELECT * FROM TBITEMCOLETA AS ict
  INNER JOIN TBREGISTRO AS re ON re.DFIDITEMCOLETAAPP = ict.DFIDITEMCOLETAAPP
  WHERE re.DFTIPOREGISTRO = 'O' AND re.DFIDITEMCOLETAAPP = ?
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDITEMCOLETAAPP], (tx, results) => {
          if (results.rows.raw().length > 0) {
            resolve(true);
            return true;
          }
          resolve(false);
          return false;
        });
      });
    } catch (_) {
      resolve(false);
      return false;
    }
  });
};

export { selectItemCollectWithOccurrence };
