import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { StoredMouth } from '../../../types/storedMouth';

interface ISearchTbBocaArmazenadaApi {
  db: SQLiteDatabase;
  DFIDCOLETAAPP: string | number;
}
const searchTbBocaArmazenadaApi = ({
  db,
  DFIDCOLETAAPP,
}: ISearchTbBocaArmazenadaApi): Promise<StoredMouth[] | null> => {
  const querySelect = `
  SELECT
  bo.DFIDITEMCOLETA,
  bo.DFBOCA,
  bo.DFVOLUME, 
  bo.DFIDITEMCOLETAAPP
  FROM TBCOLETA co
  INNER JOIN TBITEMCOLETA it ON it.DFIDCOLETAAPP = co.DFIDCOLETAAPP
  INNER JOIN TBBOCAARMAZENADA bo ON bo.DFIDITEMCOLETAAPP = it.DFIDITEMCOLETAAPP
  WHERE co.DFIDCOLETAAPP = ?
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDCOLETAAPP], (tx, results) => {
          if (results.rows.length > 0) {
            const list: StoredMouth[] = [];
            for (let i = 0; i <= results.rows.length - 1; i += 1) {
              list.push(results.rows.item(i));
            }

            resolve(list);
            return list;
          }
          const list: StoredMouth[] = [];
          resolve(list);
          return list;
        });
      });
    } catch (error) {}
  });
};

export { searchTbBocaArmazenadaApi };
