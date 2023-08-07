import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { StoredMouth } from '../../../types/storedMouth';

interface IUpdateTbBocaArmazenada extends StoredMouth {
  db: SQLiteDatabase;
}

const updateTbBocaArmazenadaApi = async ({
  db,
  DFIDITEMCOLETA,
  DFIDITEMCOLETAAPP,
  DFBOCA,
}: IUpdateTbBocaArmazenada) => {
  const query = `
  UPDATE TBBOCAARMAZENADA SET
  DFIDITEMCOLETA = ?
  WHERE DFIDITEMCOLETAAPP = ? AND
  DFBOCA = ?;
  `;

  await db.transaction(tx => {
    tx.executeSql(
      query,
      [DFIDITEMCOLETA, DFIDITEMCOLETAAPP, DFBOCA],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      _ => null,
    );
  });
};

export { updateTbBocaArmazenadaApi };
