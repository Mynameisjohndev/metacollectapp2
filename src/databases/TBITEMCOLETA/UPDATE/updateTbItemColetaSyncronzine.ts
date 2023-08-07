import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../types/collectItem';

interface IUpdate extends CollectItem {
  db: SQLiteDatabase;
}
const updateTbItemColetaSyncronzine = async ({
  db,
  DFIDCOLETA,
  DFIDITEMCOLETA,
  DFIDITEMCOLETAAPP,
  DFIDTANQUE,
}: IUpdate) => {
  const queryUpdate = `
  UPDATE TbItemColeta SET
  DFIDCOLETA = ?,
  DFIDITEMCOLETA  = ?
  WHERE DFIDITEMCOLETAAPP = ? AND DFIDTANQUE = ?;
`;

  await db.transaction(tx => {
    tx.executeSql(
      queryUpdate,
      [
        `${DFIDCOLETA || ''}`,
        `${DFIDITEMCOLETA || ''}`,
        `${DFIDITEMCOLETAAPP || ''}`,
        `${DFIDTANQUE || ''}`,
      ],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      _ => null,
    );
  });
};

export { updateTbItemColetaSyncronzine };
