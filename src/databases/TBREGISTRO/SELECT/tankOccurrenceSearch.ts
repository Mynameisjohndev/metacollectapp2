import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Register } from '../../../types/register';

interface ITankOccurrenceSearch {
  db: SQLiteDatabase;
  DFIDCOLETAAPP: number;
  DFIDCOLETA: number;
  DFIDITEMCOLETAAPP: number;
  DFIDITEMCOLETA: number;
}
const tankOccurrenceSearch = ({
  db,
  DFIDCOLETA,
  DFIDCOLETAAPP,
  DFIDITEMCOLETAAPP,
  DFIDITEMCOLETA,
}: ITankOccurrenceSearch): Promise<Register[] | boolean> => {
  const querySelect = `
  SELECT re.DFOBSERVACAO, re.DFIDREGISTROAPP FROM TBREGISTRO AS re
  WHERE re.DFTIPOREGISTRO = 'O'
  AND (re.DFIDCOLETAAPP = ? OR re.DFIDCOLETA = ?)
  AND (re.DFIDITEMCOLETAAPP = ? OR re.DFIDITEMCOLETA = ?);
`;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          querySelect,
          [DFIDCOLETAAPP, DFIDCOLETA, DFIDITEMCOLETAAPP, DFIDITEMCOLETA],
          (tx, results) => {
            if (results.rows.length > 0) {
              const list: Register[] = [];
              for (let i = 0; i <= results.rows.length - 1; i += 1) {
                list.push(results.rows.item(i));
              }
              resolve(list);
              return list;
            }
            resolve(false);
            return false;
          },
        );
      });
    } catch (error) {}
  });
};

export { tankOccurrenceSearch };
