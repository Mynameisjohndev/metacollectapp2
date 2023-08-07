import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface ICountCollectItensWithStatusCollected {
  db: SQLiteDatabase;
  DFIDCOLETAAPP: number;
}
const countCollectItensWithStatusCollected = ({
  db,
  DFIDCOLETAAPP,
}: ICountCollectItensWithStatusCollected): Promise<number> => {
  const query = `
  SELECT itc.DFIDITEMCOLETAAPP, re.DFIDREGISTROAPP  FROM TBITEMCOLETA as itc
  INNER JOIN TBREGISTRO as re ON re.DFIDITEMCOLETAAPP = itc.DFIDITEMCOLETAAPP
  WHERE itc.DFIDCOLETAAPP = ? and (re.DFTIPOREGISTRO = "C" or re.DFTIPOREGISTRO = "O" )
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDCOLETAAPP], (tx, results) => {
          const list = results.rows.raw();
          const list2 = [...list, ...list];
          const uniqueIds = {};
          let count = 0;
          list2.forEach(element => {
            const id = element.DFIDITEMCOLETAAPP;
            if (!uniqueIds[id]) {
              uniqueIds[id] = true;
              count += 1;
            }
          });
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

export { countCollectItensWithStatusCollected };
