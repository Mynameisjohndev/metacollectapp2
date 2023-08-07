import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Tank } from '../../../types/tank';

interface IUpdate extends Tank {
  db: SQLiteDatabase;
}
const UpdateTbTanque = async ({
  db,
  DFIDTANQUE,
  DFDESCTANQUE,
  DFATIVO,
  DFCOLETASELETIVA,
  DFIDLINHA,
}: IUpdate) => {
  const queryUpdate = `
  UPDATE TBTANQUE SET 
  DFDESCTANQUE = ?,
  DFATIVO = ?,
  DFCOLETASELETIVA = ?,
  DFIDLINHA = ?
  WHERE DFIDTANQUE = ?
`;

  await db.transaction(tx => {
    tx.executeSql(
      queryUpdate,
      [DFDESCTANQUE, DFATIVO, DFCOLETASELETIVA, DFIDLINHA, DFIDTANQUE],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      _ => null,
    );
  });
};

export { UpdateTbTanque };
