import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { RegisterItemDb } from '../../../types/registerItemDb';

interface IUpdateRegisterItemById extends RegisterItemDb {
  db: SQLiteDatabase;
  imageQuality?: string;
  imageTemperature?: string[];
}

const updateRegisterItemById = async ({
  db,
  DFIDREGISTROAPP,
  DFIDREGISTRO,
}: IUpdateRegisterItemById): Promise<boolean> => {
  const queryUpadte = `
  UPDATE TBITEMREGISTRO SET DFITEMREGISTROENVIADO = 'S', DFIDREGISTRO = ?
  WHERE DFIDREGISTROAPP = ?;
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryUpadte,
          [DFIDREGISTRO, DFIDREGISTROAPP],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              const responseResults = true;
              resolve(responseResults);
              return responseResults;
            }
            const responseResults = false;
            resolve(responseResults);
            return responseResults;
          },
        );
      });
    } catch (error) {
      resolve(false);
      return false;
    }
  });
};

export { updateRegisterItemById };
