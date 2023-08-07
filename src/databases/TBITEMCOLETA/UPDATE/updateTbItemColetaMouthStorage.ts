import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../types/collectItem';

interface IUpdate extends CollectItem {
  db: SQLiteDatabase;
}
const updateTbItemColetaMouthStorage = async ({
  db,
  DFQTDCOLETADA,
  DFIDITEMCOLETAAPP,
}: IUpdate) => {
  const queryUpdate = `
  UPDATE TbItemColeta SET
  DFQTDCOLETADA = ?
  WHERE DFIDITEMCOLETAAPP = ?;
`;

  await db.transaction(tx => {
    tx.executeSql(
      queryUpdate,
      [DFQTDCOLETADA, DFIDITEMCOLETAAPP],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      _ => null,
    );
  });
};

export { updateTbItemColetaMouthStorage };
