import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Register } from '../../../types/register';

interface IUpdateRegitryApi extends Register {
  db: SQLiteDatabase;
  imageQuality?: string;
  imageTemperature?: string[];
}

const updateRegisterById = async ({
  db,
  DFIDREGISTROAPP,
  DFIDREGISTRO,
}: IUpdateRegitryApi): Promise<boolean> => {
  const queryUpadte = `
  UPDATE TBREGISTRO SET DFREGISTROENVIADO = 'S', DFIDREGISTRO = ?
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
              resolve(true);
              return true;
            }
            resolve(false);
            return false;
          },
        );
      });
    } catch (error) {
      resolve(false);
      return false;
    }
  });
};

export { updateRegisterById };
