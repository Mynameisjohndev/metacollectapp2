import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Line } from '../../../types/line';

interface IInsertTbLinha extends Line {
  db: SQLiteDatabase;
}

const insertTbLinha = async ({
  db,
  DFIDLINHA,
  DFNOMELINHA,
  DFATIVO,
  DFIDREGIONAL,
  DFIDUNIDADE,
  DFIDCARRETEIRO,
}: IInsertTbLinha): Promise<boolean> => {
  const queryInsert = `
    INSERT OR REPLACE INTO TBLINHA (
      DFIDLINHA,
      DFNOMELINHA,
      DFATIVO,
      DFIDREGIONAL,
      DFIDUNIDADE,
      DFIDCARRETEIRO
    )
    VALUES (?,?,?,?,?,?);
  `;
  return new Promise(resolver => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [
            DFIDLINHA,
            `${DFNOMELINHA || ''}`,
            `${DFATIVO || ''}`,
            DFIDREGIONAL,
            DFIDUNIDADE,
            DFIDCARRETEIRO,
          ],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolver(true);
              return true;
            }
            resolver(false);
            return false;
          },
          _ => null,
        );
      });
    } catch (error) {
      // console.log('error linha ', error);
      resolver(false);
      return false;
    }
  });
};

export { insertTbLinha };
