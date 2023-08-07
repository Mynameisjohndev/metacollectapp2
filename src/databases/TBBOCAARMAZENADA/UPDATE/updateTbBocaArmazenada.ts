import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { StoredMouth } from '../../../types/storedMouth';
import { insertTbBocaArmazenada } from '../INSERT/insertTbBocaArmazenada';

interface IUpdateTbBocaArmazenada extends StoredMouth {
  db: SQLiteDatabase;
}

const updateTbBocaArmazenada = async ({
  db,
  DFVOLUME,
  DFIDITEMCOLETAAPP,
  DFBOCA,
}: IUpdateTbBocaArmazenada) => {
  const query = `
  UPDATE TBBOCAARMAZENADA SET
  DFVOLUME = ?
  WHERE DFIDITEMCOLETAAPP = ? AND
  DFBOCA = ?;
  `;

  await db.transaction(tx => {
    tx.executeSql(
      query,
      [DFVOLUME, DFIDITEMCOLETAAPP, DFBOCA],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
      },
      _ => null,
    );
  });
};

export { updateTbBocaArmazenada };
