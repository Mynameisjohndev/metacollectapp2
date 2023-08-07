import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { TankBond } from '../../../types/tankBond';

interface IInsertTbVinculoTanque extends TankBond {
  db: SQLiteDatabase;
}

const InsertTbVinculoTanque = async ({
  db,
  DFIDTANQUE,
  DFIDPROPRIEDADE,
  DFPROPRIETARIO,
}: IInsertTbVinculoTanque): Promise<boolean> => {
  const queryInsert = `
    INSERT INTO TBVINCULOTANQUE (
      DFIDTANQUE,
      DFIDPROPRIEDADE,
      DFPROPRIETARIO
    )
    VALUES (?,?,?);
  `;
  return new Promise(resolver => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryInsert,
          [DFIDTANQUE, DFIDPROPRIEDADE, `${DFPROPRIETARIO || ''}`],
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
      // console.log('error vinculo tanque ', error);
      resolver(false);
      return false;
    }
  });
};

export { InsertTbVinculoTanque };
