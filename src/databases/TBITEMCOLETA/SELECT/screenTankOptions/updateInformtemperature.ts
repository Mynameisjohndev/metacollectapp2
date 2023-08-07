import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../../types/collectItem';

interface IUpdateInformVolume extends CollectItem {
  db: SQLiteDatabase;
}
const updateInformtemperature = ({
  db,
  DFTEMPERATURA,
  DFIDITEMCOLETAAPP,
}: IUpdateInformVolume): Promise<boolean> => {
  const query = `
  UPDATE TBITEMCOLETA SET DFTEMPERATURA = ? WHERE DFIDITEMCOLETAAPP = ?
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [DFTEMPERATURA, DFIDITEMCOLETAAPP],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve(true);
              return true;
            }
            resolve(false);
            return false;
          },
        );
      });
    } catch (error) {
      resolve(false);
      return false;
    }
  });
};
export { updateInformtemperature };
