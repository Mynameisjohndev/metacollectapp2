import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Line } from '../../../types/line';

interface IUpdate extends Line {
  db: SQLiteDatabase;
}
const UpdateTbLinha = async ({
  db,
  DFIDLINHA,
  DFNOMELINHA,
  DFATIVO,
  DFIDREGIONAL,
  DFIDUNIDADE,
  DFIDCARRETEIRO,
}: IUpdate) => {
  const queryUpdate = `
  UPDATE TBLINHA SET 
  DFNOMELINHA = ?,
  DFATIVO = ?,
  DFIDREGIONAL = ?,
  DFIDUNIDADE = ?,
  DFIDCARRETEIRO = ?
  WHERE DFIDLINHA = ?
`;

  await db.transaction(tx => {
    tx.executeSql(
      queryUpdate,
      [
        DFNOMELINHA,
        DFATIVO,
        DFIDREGIONAL,
        DFIDUNIDADE,
        DFIDCARRETEIRO,
        DFIDLINHA,
      ],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      _ => null,
    );
  });
};

export { UpdateTbLinha };
