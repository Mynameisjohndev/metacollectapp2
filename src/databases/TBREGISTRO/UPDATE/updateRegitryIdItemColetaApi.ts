import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Register } from '../../../types/register';

interface IUpdateRegitryApi extends Register {
  db: SQLiteDatabase;
  imageQuality?: string;
  imageTemperature?: string[];
}

const updateRegitryIdItemColetaApi = async ({
  db,
  DFIDCOLETA,
  DFTIPOREGISTRO,
  DFIDCOLETAAPP,
  DFIDITEMCOLETAAPP,
  DFIDITEMCOLETA,
}: IUpdateRegitryApi): Promise<boolean> => {
  const queryUpadte = `
  UPDATE TBREGISTRO SET DFIDCOLETA = ?, DFIDITEMCOLETA = ?
  WHERE DFTIPOREGISTRO = ? 
  AND DFIDCOLETAAPP = ? AND DFIDITEMCOLETAAPP = ?;
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryUpadte,
          [
            DFIDCOLETA,
            DFIDITEMCOLETA,
            DFTIPOREGISTRO,
            DFIDCOLETAAPP,
            DFIDITEMCOLETAAPP,
          ],
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

export { updateRegitryIdItemColetaApi };
