import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Collect } from '../../../types/collect';

interface IUpdate extends Collect {
  db: SQLiteDatabase;
}
const updateTbColeta = async ({
  db,
  DFSTATUS,
  DFDATACOLETA,
  DFHORACOLETA,
  DFIDCOLETAAPP,
  DFKMFINAL,
}: IUpdate): Promise<boolean> => {
  const queryUpdate = `
  UPDATE TBCOLETA SET
  DFSTATUS = ?,
  DFDATACOLETA = ?,
  DFHORACOLETA = ?,
  DFKMFINAL = ?
  WHERE DFIDCOLETAAPP = ?;
`;

  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        queryUpdate,
        [DFSTATUS, DFDATACOLETA, DFHORACOLETA, DFKMFINAL, DFIDCOLETAAPP],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(true);
            return true;
          }
          resolve(false);
          return false;
        },
        () => {
          resolve(false);
          return false;
        },
      );
    });
  });
};

export { updateTbColeta };
