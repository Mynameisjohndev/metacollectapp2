import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { VehicleTank } from '../../../types/vehicleTank';

interface IInsertTbTanqueVeiculo extends VehicleTank {
  db: SQLiteDatabase;
}

const InsertTbTanqueVeiculo = async ({
  db,
  DFBOCA,
  DFCAPACIDADE,
  DFCOLETASELETIVA,
  DFIDVEICULO,
}: IInsertTbTanqueVeiculo): Promise<boolean> => {
  const queryInsert = `
    INSERT INTO TBTANQUEVEICULO(
      DFBOCA,
      DFCAPACIDADE,
      DFCOLETASELETIVA,
      DFIDVEICULO
    )
    VALUES (?,?,?,?);
  `;
  return new Promise(resolver => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [
            DFBOCA,
            `${DFCAPACIDADE || ''}`,
            `${DFCOLETASELETIVA || ''}`,
            DFIDVEICULO,
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
      // console.log('error tanque veiculo ', error);
      resolver(false);
      return false;
    }
  });
};

export { InsertTbTanqueVeiculo };
