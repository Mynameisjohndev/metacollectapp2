import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface IUpdateIMEIFromSetting {
  db: SQLiteDatabase;
  DFIDCARRETEIRO: number;
  DFIMEI?: number;
}

const updateIMEIFromSetting = async ({
  db,
  DFIDCARRETEIRO,
  DFIMEI,
}: IUpdateIMEIFromSetting): Promise<boolean> => {
  const queryUpdate = `
  UPDATE TBCONFIGURACAO 
  SET 
  DFIMEI = ${DFIMEI ? `"${DFIMEI}"` : null}
  WHERE DFIDCARRETEIRO = ?
`;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(queryUpdate, [DFIDCARRETEIRO], (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(true);
            return true;
          }
          resolve(false);
          return false;
        });
      });
    } catch (erro) {
      resolve(false);
      return false;
    }
  });
};

export { updateIMEIFromSetting };
