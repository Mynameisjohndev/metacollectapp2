import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../types/collectItem';

interface ICompletedCollectTbItemColetaTbItemColeta extends CollectItem {
  db: SQLiteDatabase;
}
const completedCollectTbItemColetaTbItemColeta = async ({
  db,
  DFIDITEMCOLETAAPP,
  DFIDCOLETAAPP,
}: ICompletedCollectTbItemColetaTbItemColeta): Promise<boolean> => {
  const query = `
  UPDATE TBITEMCOLETA SET
  DFTIPOITEMCOLETA = 'C'
  WHERE DFIDITEMCOLETAAPP = ? AND DFIDCOLETAAPP = ? AND DFTIPOITEMCOLETA = 'N'
  `;

  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [DFIDITEMCOLETAAPP, DFIDCOLETAAPP],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(true);
            return true;
          }
          resolve(true);
          return false;
        },
        _ => null,
      );
    });
  });
};

export { completedCollectTbItemColetaTbItemColeta };
