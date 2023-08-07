import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Region } from '../../../types/region';

interface IInsertTbRegional extends Region {
  db: SQLiteDatabase;
}

const InsertTbRegional = async ({
  db,
  DFIDREGIONAL,
  DFDESCREGIONAL,
}: IInsertTbRegional): Promise<boolean> => {
  const queryInsert = `
    INSERT INTO TBREGIONAL (    
      DFIDREGIONAL,
      DFDESCREGIONAL
    )
    VALUES (?,?);
  `;

  return new Promise(resolver => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [DFIDREGIONAL, DFDESCREGIONAL],
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
      // console.log('error região ', error);
      resolver(false);
      return false;
    }
  });
};

export { InsertTbRegional };
