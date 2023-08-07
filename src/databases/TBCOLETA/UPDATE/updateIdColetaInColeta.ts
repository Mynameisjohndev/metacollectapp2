import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Collect } from '../../../types/collect';

interface IUpdateIdColetaInColeta {
  db: SQLiteDatabase;
  DFIDCOLETA: number;
  DFIDCOLETAAPP: number;
}

const updateIdColetaInColeta = async ({
  db,
  DFIDCOLETA,
  DFIDCOLETAAPP,
}: IUpdateIdColetaInColeta): Promise<boolean> => {
  const queryUpdate = `
  UPDATE TBCOLETA SET
  DFIDCOLETA = ?
  WHERE DFIDCOLETAAPP = ?;
`;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryUpdate,
          [DFIDCOLETA, DFIDCOLETAAPP],
          (_, results) => {
            if (results.rowsAffected > 0) {
              resolve(true);
              return true;
            }
            resolve(false);
            return false;
          },
          _ => null,
        );
      });
    } catch (error) {
      resolve(false);
      return false;
    }
  });
};

export { updateIdColetaInColeta };
