import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../types/collectItem';

interface IInsertTbItemColetaApi {
  db: SQLiteDatabase;
  collectItem: CollectItem;
  DFIDCOLETAAPP: string | number;
}

const insertTbItemColetaApi = async ({
  db,
  collectItem,
  DFIDCOLETAAPP,
}: IInsertTbItemColetaApi): Promise<string | number | null> => {
  const {
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
    DFSENSORIAL,
    DFTIPOALIZAROL,
    DFCOLETOULACRE,
    DFTIPOITEMCOLETA,
  } = collectItem;
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
      DFIDCOLETAAPP,
      DFSENSORIAL,
      DFTIPOALIZAROL,
      DFCOLETOULACRE,
      DFTIPOITEMCOLETA
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [
            `${DFIDITEMCOLETA}`,
            `${DFIDCOLETA}`,
            `${DFIDTANQUE || ''}`,
            `${DFQTDPREVISTA || ''}`,
            `${DFQTDCOLETADA || ''}`,
            `${DFREGUAFRENTE || ''}`,
            `${DFREGUAATRAS || ''}`,
            DFTEMPERATURA || null,
            `${DFHORACOLETA || ''}`,
            `${DFALIZAROL || ''}`,
            `${DFCOLETOUAMOSTRA || ''}`,
            `${DFIDITEMCOLETAERP || ''}`,
            `${DFIDCOLETAAPP}`,
            `${DFSENSORIAL || ''}`,
            `${DFTIPOALIZAROL || ''}`,
            `${DFCOLETOULACRE || ''}`,
            `${DFTIPOITEMCOLETA}`,
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

export { insertTbItemColetaApi };
