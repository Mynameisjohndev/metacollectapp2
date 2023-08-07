import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Register } from '../../../types/register';

interface IUpdateRegitry extends Register {
  db: SQLiteDatabase;
  imageQuality?: string;
  imageTemperature?: string[];
}

const updateRegitry = async ({
  db,
  DFDATAREGISTRO,
  DFHORAREGISTRO,
  DFLOCALIZACAO,
  DFTIPOREGISTRO,
  DFIDITEMCOLETAAPP,
}: IUpdateRegitry): Promise<boolean> => {
  const queryUpadte = `
  UPDATE TBREGISTRO SET DFDATAREGISTRO = ?, DFHORAREGISTRO = ?, DFLOCALIZACAO = ? 
  WHERE DFTIPOREGISTRO = ? 
  AND DFIDITEMCOLETAAPP = ?;
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryUpadte,
          [
            DFDATAREGISTRO,
            DFHORAREGISTRO,
            DFLOCALIZACAO,
            DFTIPOREGISTRO,
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

export { updateRegitry };
