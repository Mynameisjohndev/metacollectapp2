import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../../types/collectItem';

interface IUpdateInformSecondRuler extends CollectItem {
  db: SQLiteDatabase;
}
const UpdateInformSecondRuler = ({
  db,
  DFREGUAATRAS,
  DFIDITEMCOLETAAPP,
}: IUpdateInformSecondRuler): Promise<CollectItem[]> => {
  const query = `
  UPDATE TBITEMCOLETA SET DFREGUAATRAS = ? WHERE DFIDITEMCOLETAAPP = ?
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [DFREGUAATRAS, DFIDITEMCOLETAAPP],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) return true;
            return false;
          },
        );
      });
    } catch (error) {}
  });
};
export { UpdateInformSecondRuler };
