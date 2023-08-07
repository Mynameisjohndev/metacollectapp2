import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { validReceiveCurrentGpsLocationCoords } from '../../../services/GPS/validReceiveCurrentGpsLocationCoords';
import { Register } from '../../../types/register';
import { insertTbRegistro } from './insertTbRegistro';

interface IInsertRegitryWithDfIdColetaApp extends Register {
  db: SQLiteDatabase;
}
const insertRegitryWithDfIdColetaApp = async ({
  db,
  DFDATAREGISTRO,
  DFHORAREGISTRO,
  DFTIPOREGISTRO,
  DFIDCOLETAAPP,
  DFIDCOLETA,
  DFIDITEMCOLETAAPP,
  DFOBSERVACAO,
  DFIMEI,
  DFIDCARRETEIRO,
}: IInsertRegitryWithDfIdColetaApp): Promise<Register[]> => {
  let geometry = await validReceiveCurrentGpsLocationCoords();
  const querySelectIdColetaApp = `
  SELECT *
  FROM TBREGISTRO 
  WHERE (DFIDCOLETAAPP = ? OR DFIDCOLETA = ?) AND DFTIPOREGISTRO = ? 
  `;
  return new Promise(resolver => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          querySelectIdColetaApp,
          [DFIDCOLETAAPP, DFIDCOLETA, DFTIPOREGISTRO],
          (tx, results) => {
            if (results.rows.length > 0) {
              const list: Register[] = [];
              for (let i = 0; i <= results.rows.length - 1; i += 1) {
                list.push(results.rows.item(i));
              }
              resolver(list);
              return list;
            }
            insertTbRegistro({
              db,
              DFDATAREGISTRO,
              DFHORAREGISTRO,
              DFTIPOREGISTRO,
              DFIDITEMCOLETAAPP,
              DFIDCOLETAAPP,
              DFOBSERVACAO,
              DFIMEI,
              DFIDCARRETEIRO,
              geometry,
            });
            resolver(null);
            return null;
          },
          _ => null,
        );
      });
    } catch (error) {
      return null;
    }
  });
};

export { insertRegitryWithDfIdColetaApp };
