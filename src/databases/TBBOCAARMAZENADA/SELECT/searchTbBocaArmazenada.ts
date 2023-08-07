import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { StoredMouth } from '../../../types/storedMouth';

interface ISearchTbBocaArmazenada extends StoredMouth {
  db: SQLiteDatabase;
}
const searchTbBocaArmazenada = ({
  db,
  DFIDITEMCOLETAAPP,
  DFBOCA,
}: ISearchTbBocaArmazenada): Promise<StoredMouth[] | null> => {
  const querySelect = `
  SELECT DFVOLUME
  FROM TBBOCAARMAZENADA
  WHERE DFIDITEMCOLETAAPP = ? AND DFBOCA = ?
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          querySelect,
          [DFIDITEMCOLETAAPP, DFBOCA],
          (tx, results) => {
            if (results.rows.length > 0) {
              const list = [];
              for (let i = 0; i <= results.rows.length - 1; i += 1) {
                list.push(results.rows.item(i));
              }
              resolve(list);
              return list;
            }

            resolve(null);
            return null;
          },
        );
      });
    } catch (error) {}
  });
};

export { searchTbBocaArmazenada };
