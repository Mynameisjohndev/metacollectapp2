import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface IUpdateDataAfterSynchronization {
  db: SQLiteDatabase;
  DFDATASINCRONIZACAO: string;
  DFHORASINCRONIZACAO: string;
  DFIDCARRETEIRO: number;
}

const updateDataAfterSynchronization = async ({
  db,
  DFDATASINCRONIZACAO,
  DFHORASINCRONIZACAO,
  DFIDCARRETEIRO,
}: IUpdateDataAfterSynchronization): Promise<boolean> => {
  const queryUpdate = `
  UPDATE TBCONFIGURACAO SET DFDATASINCRONIZACAO = ?, DFHORASINCRONIZACAO = ?
  WHERE DFIDCARRETEIRO = ?
`;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          queryUpdate,
          [DFDATASINCRONIZACAO, DFHORASINCRONIZACAO, DFIDCARRETEIRO],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve(true);
              return true;
            }
            resolve(false);
            return false;
          },
        );
      });
    } catch (erro) {
      resolve(false);
      return false;
    }
  });
};

export { updateDataAfterSynchronization };
