import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../types/collectItem';

interface IInsertCollectItem {
  db: SQLiteDatabase;
  DFIDCOLETAAPP: number;
  DFIDTANQUE: number;
  DFTIPOITEMCOLETA?: 'C' | 'N' | 'S';
}
interface IResponse {
  created: boolean;
  DFIDITEMCOLETAAPP?: number;
}

const insertCollectItem = async ({
  db,
  DFIDCOLETAAPP,
  DFIDTANQUE,
  DFTIPOITEMCOLETA,
}: IInsertCollectItem): Promise<IResponse> => {
  const queryInsert = `
  INSERT INTO TBITEMCOLETA (
    DFIDCOLETAAPP,
    DFIDTANQUE,
    DFTIPOITEMCOLETA)
    VALUES (?,?,?);
  `;
  return new Promise(resolve => {
    let responseNotReceive = {
      created: false,
    };
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [DFIDCOLETAAPP, DFIDTANQUE, DFTIPOITEMCOLETA || 'N'],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) {
              const response = {
                created: true,
                DFIDITEMCOLETAAPP: insertId,
              };
              resolve(response);
              return response;
            }
            resolve(responseNotReceive);
            return responseNotReceive;
          },
        );
      });
    } catch (error) {
      resolve(responseNotReceive);
      return responseNotReceive;
    }
  });
};
export { insertCollectItem };
