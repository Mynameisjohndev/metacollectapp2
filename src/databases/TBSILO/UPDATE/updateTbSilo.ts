import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Silo } from '../../../types/silo';

interface IUpdate extends Silo {
  db: SQLiteDatabase;
}
const UpdateTbSilo = async ({
  db,
  DFIDSILO,
  DFDESCRICAOSILO,
  DFCAPACIDADE,
  DFCOLETASELETIVA,
  DFIDUNIDADE,
}: IUpdate) => {
  const queryUpdate = `
  UPDATE TBSILO SET 
  DFDESCRICAOSILO = ?,
  DFCAPACIDADE = ?,
  DFCOLETASELETIVA = ?,
  DFIDUNIDADE = ?
  WHERE DFIDSILO = ?
`;

  await db.transaction(tx => {
    tx.executeSql(
      queryUpdate,
      [DFDESCRICAOSILO, DFCAPACIDADE, DFCOLETASELETIVA, DFIDUNIDADE, DFIDSILO],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      _ => null,
    );
  });
};

export { UpdateTbSilo };
