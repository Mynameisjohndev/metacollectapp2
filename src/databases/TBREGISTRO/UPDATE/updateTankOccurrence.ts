import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface IUpdateTankOccurrence {
  db: SQLiteDatabase;
  DFIDITEMCOLETAAPP: number;
  DFIDITEMCOLETA: number;
  DFOBSERVACAO: string;
}

const updateTankOccurrence = async ({
  db,
  DFIDITEMCOLETAAPP,
  DFIDITEMCOLETA,
  DFOBSERVACAO,
}: IUpdateTankOccurrence): Promise<number | boolean> => {
  const queryUpadte = `
  UPDATE TBREGISTRO SET DFREGISTROENVIADO = 'N', DFOBSERVACAO = ?
  WHERE (DFIDITEMCOLETAAPP = ? OR DFIDITEMCOLETA = ?)
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryUpadte,
          [DFOBSERVACAO, DFIDITEMCOLETAAPP, DFIDITEMCOLETA],
          (_, results) => {
            if (results.rowsAffected > 0) {
              resolve(results.insertId);
              return results.insertId;
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

export { updateTankOccurrence };
