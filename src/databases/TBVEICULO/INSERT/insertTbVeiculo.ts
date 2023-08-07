import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Vehicle } from '../../../types/vehicle';

interface IInsertTbVeiculo extends Vehicle {
  db: SQLiteDatabase;
}

const InsertTbVeiculo = async ({
  db,
  DFIDVEICULO,
  DFDESCVEICULO,
  DFATIVO,
  DFPLACAVEICULO,
}: IInsertTbVeiculo): Promise<boolean> => {
  const queryInsert = `
    INSERT INTO TBVEICULO (
      DFIDVEICULO,
      DFDESCVEICULO,
      DFATIVO,
      DFPLACAVEICULO
    )
    VALUES (?,?,?,?);
  `;

  return new Promise(resolver => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [
            DFIDVEICULO,
            `${DFDESCVEICULO || ''}`,
            `${DFATIVO || ''}`,
            `${DFPLACAVEICULO || ''}`,
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
      // console.log('error veiculo ', error);
      resolver(false);
      return false;
    }
  });
};

export { InsertTbVeiculo };
