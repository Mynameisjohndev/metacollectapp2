import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Register } from '../../../types/register';
import { RegisterItemDb } from '../../../types/registerItemDb';

interface ISearchTbItemRegistroApi extends Register {
  db: SQLiteDatabase;
}
const searchTbItemRegistroApi = ({
  db,
  DFIDCOLETAAPP,
}: ISearchTbItemRegistroApi): Promise<RegisterItemDb[]> => {
  const querySelect = `
  SELECT 
  itr.DFIDITEMREGISTRO,
  itr.DFIDITEMREGISTROAPP,
  itr.DFIDREGISTRO,
  itr.DFREGISTROIMAGEM,
  itr.DFIDREGISTROAPP,
  itr.DFITEMREGISTROENVIADO
  FROM TBITEMREGISTRO AS itr
  INNER JOIN TBREGISTRO AS re ON re.DFIDREGISTROAPP = itr.DFIDREGISTROAPP
  INNER JOIN TBCOLETA AS co ON co.DFIDCOLETAAPP = re.DFIDCOLETAAPP
  WHERE re.DFIDCOLETAAPP = ?
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDCOLETAAPP], (tx, results) => {
          if (results.rows.length > 0) {
            const list: RegisterItemDb[] = [];
            for (let i = 0; i <= results.rows.length - 1; i += 1) {
              list.push(results.rows.item(i));
            }
            resolve(list);
            return list;
          }
          resolve([]);
          return [];
        });
      });
    } catch (error) {
      resolve([]);
      return [];
    }
  });
};

export { searchTbItemRegistroApi };
