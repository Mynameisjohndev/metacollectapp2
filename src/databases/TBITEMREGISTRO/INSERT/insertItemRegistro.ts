import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { RegisterItem } from '../../../types/registerItem';

interface IInsertItemRegistro extends RegisterItem {
  db: SQLiteDatabase;
}
const insertItemRegistro = ({
  db,
  DFIDREGISTROAPP,
  DFREGISTROIMAGEM,
}: IInsertItemRegistro) => {
  const query = `
  INSERT INTO TBITEMREGISTRO (
    DFIDREGISTROAPP,
    DFREGISTROIMAGEM
  ) VALUES (?,?);
  `;

  db.transaction(tx => {
    tx.executeSql(
      query,
      [DFIDREGISTROAPP, DFREGISTROIMAGEM],
      (tx, { rowsAffected }) => {
        if (rowsAffected > 0) return false;
      },
      _ => null,
    );
  });
};
export { insertItemRegistro };
