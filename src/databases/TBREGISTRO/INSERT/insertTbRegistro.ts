import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Register } from '../../../types/register';

interface IInsertAll extends Register {
  db: SQLiteDatabase;
  geometry: any;
}
const insertTbRegistro = async ({
  db,
  DFIDCOLETA,
  DFDATAREGISTRO,
  DFHORAREGISTRO,
  DFTIPOREGISTRO,
  DFIDITEMCOLETAAPP,
  DFIDCOLETAAPP,
  DFOBSERVACAO,
  DFIMEI,
  DFIDCARRETEIRO,
  geometry,
}: IInsertAll): Promise<string | number | boolean> => {
  let coords = JSON.stringify(geometry);

  const queryInsert = `
  INSERT INTO TBREGISTRO (
    DFIDCOLETA,
    DFDATAREGISTRO,
    DFHORAREGISTRO, 
    DFTIPOREGISTRO,
    DFIDITEMCOLETAAPP,
    DFIDCOLETAAPP,
    DFOBSERVACAO,
    DFIMEI,
    DFIDCARRETEIRO,
    DFLOCALIZACAO
    )
  VALUES (?,?,?,?,?,?,?,?,?,COALESCE(?, null));
`;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [
            DFIDCOLETA || null,
            `${DFDATAREGISTRO || ''}`,
            `${DFHORAREGISTRO || ''}`,
            `${DFTIPOREGISTRO || ''}`,
            DFIDITEMCOLETAAPP || null,
            `${DFIDCOLETAAPP || ''}`,
            `${DFOBSERVACAO || ''}`,
            `${DFIMEI || ''}`,
            `${DFIDCARRETEIRO || ''}`,
            coords,
          ],
          (_, results) => {
            if (results.rowsAffected > 0) {
              const { insertId } = results;
              resolve(insertId);
              return insertId;
            }
            resolve(false);
            return false;
          },
          _ => null,
        );
      });
    } catch (_) {
      resolve(true);
      return true;
    }
  });
};
export { insertTbRegistro };
