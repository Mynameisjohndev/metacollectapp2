import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { StoredMouth } from '../../../types/storedMouth';

interface IInsertTbBocaArmazenada {
  db: SQLiteDatabase;
  storedMouth: StoredMouth;
  DFIDITEMCOLETAAPP: string | number;
}
const insertTbBocaArmazenadaApi = async ({
  db,
  storedMouth,
  DFIDITEMCOLETAAPP,
}: IInsertTbBocaArmazenada) => {
  const { DFBOCA, DFIDITEMCOLETA, DFVOLUME } = storedMouth;
  const query = `
  INSERT INTO TBBOCAARMAZENADA (
    DFIDITEMCOLETA,
    DFIDITEMCOLETAAPP,
    DFBOCA,
    DFVOLUME
  )
    VALUES (?,?,?,?);
  `;

  await db.transaction(tx => {
    tx.executeSql(
      query,
      [DFIDITEMCOLETA, DFIDITEMCOLETAAPP, DFBOCA, `${DFVOLUME || ''}`],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      (_, error) => null,
    );
  });
};

export { insertTbBocaArmazenadaApi };
