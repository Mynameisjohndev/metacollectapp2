import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../types/collectItem';

interface IInsertTbItemColeta extends CollectItem {
  db: SQLiteDatabase;
}

const InsertTbItemColeta = async ({
  db,
  DFIDITEMCOLETA,
  DFIDCOLETA,
  DFIDTANQUE,
  DFQTDPREVISTA,
  DFQTDCOLETADA,
  DFREGUAFRENTE,
  DFREGUAATRAS,
  DFTEMPERATURA,
  DFHORACOLETA,
  DFALIZAROL,
  DFCOLETOUAMOSTRA,
  DFIDITEMCOLETAERP,
  DFIDCOLETAAPP,
}: IInsertTbItemColeta): Promise<string | number | null> => {
  const queryInsert = `
    INSERT INTO TBITEMCOLETA(
      DFIDITEMCOLETA,
      DFIDCOLETA,
      DFIDTANQUE,
      DFQTDPREVISTA,
      DFQTDCOLETADA,
      DFREGUAFRENTE,
      DFREGUAATRAS,
      DFTEMPERATURA,
      DFHORACOLETA,
      DFALIZAROL,
      DFCOLETOUAMOSTRA,
      DFIDITEMCOLETAERP,
      DFIDCOLETAAPP
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [
            `${DFIDITEMCOLETA || ''}`,
            `${DFIDCOLETA || ''}`,
            `${DFIDTANQUE || ''}`,
            `${DFQTDPREVISTA || ''}`,
            `${DFQTDCOLETADA || ''}`,
            `${DFREGUAFRENTE || ''}`,
            `${DFREGUAATRAS || ''}`,
            `${DFTEMPERATURA || ''}`,
            `${DFHORACOLETA || ''}`,
            `${DFALIZAROL || ''}`,
            `${DFCOLETOUAMOSTRA || ''}`,
            `${DFIDITEMCOLETAERP || ''}`,
            `${DFIDCOLETAAPP || ''}`,
          ],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) {
              resolve(insertId);
              return insertId;
            }
            resolve(null);
            return null;
          },
          _ => null,
        );
      });
    } catch (error) {}
  });
};

export { InsertTbItemColeta };
