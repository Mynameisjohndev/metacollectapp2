import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../../types/collectItem';

interface IUpdateInformRuler extends CollectItem {
  db: SQLiteDatabase;
}
const UpdateInformRuler = ({
  db,
  DFREGUAFRENTE,
  DFIDITEMCOLETAAPP,
}: IUpdateInformRuler): Promise<CollectItem[]> => {
  const query = `
  UPDATE TBITEMCOLETA SET DFREGUAFRENTE = ? WHERE DFIDITEMCOLETAAPP = ?
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [DFREGUAFRENTE, DFIDITEMCOLETAAPP],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) return true;
            return false;
          },
        );
      });
    } catch (error) {}
  });
};
export { UpdateInformRuler };
