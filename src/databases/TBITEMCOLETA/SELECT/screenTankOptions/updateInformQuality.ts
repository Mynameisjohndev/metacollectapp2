import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../../types/collectItem';

interface IUpdateInformQuality extends CollectItem {
  db: SQLiteDatabase;
}
const UpdateInformQuality = ({
  db,
  DFALIZAROL,
  DFTIPOALIZAROL,
  DFSENSORIAL,
  DFCOLETOUAMOSTRA,
  DFCOLETOULACRE,
  DFIDITEMCOLETAAPP,
}: IUpdateInformQuality): Promise<boolean> => {
  const query = `
    UPDATE TBITEMCOLETA SET DFALIZAROL = ?, DFTIPOALIZAROL = ?, 
      DFSENSORIAL = ?, DFCOLETOUAMOSTRA = ?, DFCOLETOULACRE = ?
      WHERE DFIDITEMCOLETAAPP = ?
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [
            DFALIZAROL,
            DFTIPOALIZAROL,
            DFSENSORIAL,
            `${DFCOLETOUAMOSTRA || ''}`,
            `${DFCOLETOULACRE || ''}`,
            DFIDITEMCOLETAAPP,
          ],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              const option = true;
              resolve(option);
              return option;
            }
            const option = false;
            resolve(option);
            return option;
          },
        );
      });
    } catch (error) {}
  });
};
export { UpdateInformQuality };
