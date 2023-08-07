import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Unity } from '../../../types/unity';

interface IUpdate extends Unity {
  db: SQLiteDatabase;
}
const UpdateTbUnidade = async ({
  db,
  DFIDUNIDADE,
  DFRAZSOCUNIDADE,
  DFCNPJCPFCEI,
  DFNOMEFANTASIA,
}: IUpdate) => {
  const queryUpdate = `
  UPDATE TBUNIDADE SET 
  DFRAZSOCUNIDADE = ?,
  DFCNPJCPFCEI = ?,
  DFNOMEFANTASIA = ?
  WHERE DFIDUNIDADE = ?
`;

  await db.transaction(tx => {
    tx.executeSql(
      queryUpdate,
      [DFRAZSOCUNIDADE, DFCNPJCPFCEI, DFNOMEFANTASIA, DFIDUNIDADE],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      _ => null,
    );
  });
};

export { UpdateTbUnidade };
