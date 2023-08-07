import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Silo } from '../../../types/silo';

interface IInsertTbSilo extends Silo {
  db: SQLiteDatabase;
}

const InsertTbSilo = async ({
  db,
  DFIDSILO,
  DFDESCRICAOSILO,
  DFCAPACIDADE,
  DFCOLETASELETIVA,
  DFIDUNIDADE,
}: IInsertTbSilo): Promise<boolean> => {
  const queryInsert = `
    INSERT INTO TBSILO (
      DFIDSILO,
      DFIDUNIDADE,
      DFDESCRICAOSILO,
      DFCAPACIDADE,
      DFCOLETASELETIVA)
    VALUES (?,?,?,?,?);
  `;
  return new Promise(resolver => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [
            DFIDSILO,
            DFIDUNIDADE,
            `${DFDESCRICAOSILO || ''}`,
            `${DFCAPACIDADE || ''}`,
            `${DFCOLETASELETIVA || ''}`,
          ],
          (tx, { rowsAffected }) => {
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
      // console.log('error silo', error);
      resolver(false);
      return false;
    }
  });
};

export { InsertTbSilo };
