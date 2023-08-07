import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { StoredMouth } from '../../../types/storedMouth';
import { insertTbBocaArmazenada } from '../INSERT/insertTbBocaArmazenada';

interface ISearchTbBocaArmazenadaInsert extends StoredMouth {
  db: SQLiteDatabase;
}
const searchTbBocaArmazenadaInsert = ({
  db,
  DFIDITEMCOLETAAPP,
  DFBOCA,
}: ISearchTbBocaArmazenadaInsert): Promise<StoredMouth[] | null> => {
  const querySelect = `
  SELECT *
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
              return true;
            }
            insertTbBocaArmazenada({ db, DFIDITEMCOLETAAPP, DFBOCA });

            resolve(null);
            return null;
          },
        );
      });
    } catch (error) {}
  });
};

export { searchTbBocaArmazenadaInsert };
