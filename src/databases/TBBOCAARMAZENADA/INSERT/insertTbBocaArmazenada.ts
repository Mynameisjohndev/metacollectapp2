import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { StoredMouth } from '../../../types/storedMouth';

interface IInsertTbBocaArmazenada extends StoredMouth {
  db: SQLiteDatabase;
}
const insertTbBocaArmazenada = async ({
  db,
  DFIDITEMCOLETAAPP,
  DFBOCA,
}: IInsertTbBocaArmazenada) => {
  const query = `
  INSERT INTO TBBOCAARMAZENADA (
    DFIDITEMCOLETAAPP,
    DFBOCA,
    DFVOLUME
  )
    VALUES (?,?, 0);
  `;

  await db.transaction(tx => {
    tx.executeSql(
      query,
      [DFIDITEMCOLETAAPP, DFBOCA],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      _ => null,
    );
  });
};

export { insertTbBocaArmazenada };
