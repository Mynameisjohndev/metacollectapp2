import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../types/collectItem';

interface IUpdateTypeTbItemColeta extends CollectItem {
  db: SQLiteDatabase;
}
const updateTypeTbItemColeta = async ({
  db,
  DFTIPOITEMCOLETA,
  DFIDITEMCOLETAAPP,
  DFIDCOLETAAPP,
}: IUpdateTypeTbItemColeta) => {
  const queryUpdate = `
  UPDATE TbItemColeta SET
  DFTIPOITEMCOLETA = ?
  WHERE DFIDITEMCOLETAAPP = ? AND DFIDCOLETAAPP = ? AND 
  (DFTIPOITEMCOLETA IS NULL OR DFTIPOITEMCOLETA = 'NULL');
`;

  await db.transaction(tx => {
    tx.executeSql(
      queryUpdate,
      [DFTIPOITEMCOLETA, DFIDITEMCOLETAAPP, DFIDCOLETAAPP],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      _ => null,
    );
  });
};

export { updateTypeTbItemColeta };
