import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Register } from '../../../types/register';

interface IInsertAll {
  db: SQLiteDatabase;
  register: Register;
  DFIDCOLETAAPP?: string | number;
  DFIDITEMCOLETAAPP?: string | number;
}
const insertTbRegistroApi = ({
  db,
  register,
  DFIDCOLETAAPP,
  DFIDITEMCOLETAAPP,
}: IInsertAll): Promise<string | number | boolean> => {
  const {
    DFDATAREGISTRO,
    DFHORAREGISTRO,
    DFLOCALIZACAO,
    DFTIPOREGISTRO,
    DFIDCOLETA,
    DFOBSERVACAO,
    DFIMEI,
    DFIDCARRETEIRO,
    DFIDREGISTRO,
    DFIDITEMCOLETA,
    DFREGISTROENVIADO,
  } = register;
  const queryInsert = `
  INSERT INTO TBREGISTRO (
    DFDATAREGISTRO,
    DFHORAREGISTRO, 
    DFLOCALIZACAO,
    DFTIPOREGISTRO,
    DFIDCOLETAAPP,
    DFIDCOLETA,
    DFOBSERVACAO,
    DFIMEI,
    DFIDCARRETEIRO,
    DFIDREGISTRO,
    DFIDITEMCOLETA,
    DFIDITEMCOLETAAPP,
    DFREGISTROENVIADO
    )
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);
`;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [
            `${DFDATAREGISTRO || ''}`,
            `${DFHORAREGISTRO || ''}`,
            `${DFLOCALIZACAO || ''}`,
            `${DFTIPOREGISTRO || ''}`,
            `${DFIDCOLETAAPP}`,
            `${DFIDCOLETA || ''}`,
            `${DFOBSERVACAO || ''}`,
            `${DFIMEI || ''}`,
            `${DFIDCARRETEIRO || ''}`,
            `${DFIDREGISTRO}`,
            `${DFIDITEMCOLETA || ''}`,
            `${DFIDITEMCOLETAAPP || ''}`,
            `${DFREGISTROENVIADO || ''}`,
          ],
          (_, results) => {
            if (results.rowsAffected > 0) {
              const { insertId } = results;
              resolve(insertId);
              return insertId;
            }
            return false;
          },
          _ => null,
        );
      });
    } catch (error) {
      return false;
    }
  });
};
export { insertTbRegistroApi };
