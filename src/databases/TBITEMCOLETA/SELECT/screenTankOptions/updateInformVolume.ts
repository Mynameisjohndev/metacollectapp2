import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../../types/collectItem';

interface IUpdateInformVolume extends CollectItem {
  db: SQLiteDatabase;
}
const updateInformVolume = ({
  db,
  DFQTDPREVISTA,
  DFIDITEMCOLETAAPP,
}: IUpdateInformVolume): Promise<CollectItem[]> => {
  const query = `
  UPDATE TBITEMCOLETA SET DFQTDPREVISTA = ? WHERE DFIDITEMCOLETAAPP = ?
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [DFQTDPREVISTA, DFIDITEMCOLETAAPP],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) return true;
            return false;
          },
        );
      });
    } catch (error) {}
  });
};
export { updateInformVolume };
