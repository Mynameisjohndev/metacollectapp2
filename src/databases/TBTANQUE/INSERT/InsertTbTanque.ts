import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Tank } from '../../../types/tank';

interface IInsertTbTanque extends Tank {
  db: SQLiteDatabase;
}

const InsertTbTanque = async ({
  db,
  DFIDTANQUE,
  DFDESCTANQUE,
  DFATIVO,
  DFCOLETASELETIVA,
  DFIDLINHA,
}: IInsertTbTanque): Promise<boolean> => {
  const queryInsert = `
    INSERT INTO TBTANQUE(
      DFIDTANQUE,
      DFDESCTANQUE,
      DFATIVO,
      DFCOLETASELETIVA,
      DFIDLINHA
    )
    VALUES (?,?,?,?,?);
  `;

  return new Promise(resolver => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [
            DFIDTANQUE,
            `${DFDESCTANQUE || ''}`,
            `${DFATIVO || ''}`,
            `${DFCOLETASELETIVA || ''}`,
            `${DFIDLINHA || ''}`,
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
      // console.log('error tanque ', error);
      resolver(false);
      return false;
    }
  });
};

export { InsertTbTanque };
