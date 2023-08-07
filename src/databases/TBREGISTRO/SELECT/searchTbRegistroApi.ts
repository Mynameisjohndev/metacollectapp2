import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Register } from '../../../types/register';

interface ISearchTbRegistroApi extends Register {
  db: SQLiteDatabase;
}
const searchTbRegistroApi = ({
  db,
  DFIDCOLETAAPP,
}: ISearchTbRegistroApi): Promise<Register[]> => {
  const querySelect = `
  SELECT
  DFIDREGISTRO, 
  DFIDREGISTROAPP, 
  DFDATAREGISTRO, 
  DFHORAREGISTRO, 
  DFLOCALIZACAO, 
  DFTIPOREGISTRO, 
  DFIDITEMCOLETA, 
  DFIDITEMCOLETAAPP, 
  DFIDCOLETA,
  DFIDCOLETAAPP,
  DFOBSERVACAO, 
  DFIMEI,
  DFIDCARRETEIRO,
  DFREGISTROENVIADO
  FROM TBREGISTRO 
  WHERE DFIDCOLETAAPP = ?;
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDCOLETAAPP], (tx, results) => {
          if (results.rows.length > 0) {
            const list: Register[] = [];
            for (let i = 0; i <= results.rows.length - 1; i += 1) {
              list.push(results.rows.item(i));
            }
            resolve(list);
            return list;
          }
          const list = [];
          resolve(list);
          return list;
        });
      });
    } catch (error) {
      resolve([]);
      return [];
    }
  });
};

export { searchTbRegistroApi };
