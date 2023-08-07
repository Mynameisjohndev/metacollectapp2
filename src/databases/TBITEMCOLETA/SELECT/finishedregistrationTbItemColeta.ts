import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Register } from '../../../types/register';

interface IFinishedregistrationTbItemColeta extends Register {
  db: SQLiteDatabase;
}
const finishedregistrationTbItemColeta = async ({
  db,
  DFIDITEMCOLETAAPP,
  DFIDITEMCOLETA,
}: IFinishedregistrationTbItemColeta): Promise<boolean> => {
  const query = `
  UPDATE TBREGISTRO SET
  DFTIPOREGISTRO = 'C', DFOBSERVACAO = 'Coleta em propriedade', DFREGISTROENVIADO = 'N'
  WHERE (DFIDITEMCOLETAAPP = ? OR DFIDITEMCOLETA = ?) AND DFTIPOREGISTRO = 'N' OR DFTIPOREGISTRO = 'C'
  `;

  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [DFIDITEMCOLETAAPP, DFIDITEMCOLETA],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(true);
            return true;
          }
          resolve(false);
          return false;
        },
        _ => {
          resolve(false);
          return false;
        },
      );
    });
  });
};

export { finishedregistrationTbItemColeta };
