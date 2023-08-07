import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Unity } from '../../../types/unity';

interface IInsertTbUnidade extends Unity {
  db: SQLiteDatabase;
}

const InsertTbUnidade = async ({
  db,
  DFIDUNIDADE,
  DFRAZSOCUNIDADE,
  DFCNPJCPFCEI,
  DFNOMEFANTASIA,
}: IInsertTbUnidade): Promise<boolean> => {
  const queryInsert = `
    INSERT INTO TBUNIDADE (
    DFIDUNIDADE,
    DFRAZSOCUNIDADE,
    DFCNPJCPFCEI,
    DFNOMEFANTASIA
    )
    VALUES (?,?,?,?);
  `;
  return new Promise(resolver => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [
            DFIDUNIDADE,
            `${DFRAZSOCUNIDADE || ''}`,
            `${DFCNPJCPFCEI || ''}`,
            `${DFNOMEFANTASIA || ''}`,
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
      // console.log('Error unidade', error);
      resolver(false);
      return false;
    }
  });
};

export { InsertTbUnidade };
