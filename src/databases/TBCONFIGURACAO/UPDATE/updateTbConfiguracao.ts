import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../types/collectItem';
import { Config } from '../../../types/config';

interface IUpdateTbConfiguracao extends Config {
  db: SQLiteDatabase;
}
const updateTbConfiguracao = async ({
  db,
  DFDISTRIBUIR,
  DFIDCARRETEIRO,
  DFREGUAATRAS,
  DFDATASINCRONIZACAO,
  DFHORASINCRONIZACAO,
}: IUpdateTbConfiguracao) => {
  const queryUpdate = `
  UPDATE TBCONFIGURACAO SET DFREGUAATRAS = ?, DFDISTRIBUIR = ?, DFDATASINCRONIZACAO = ?,
  DFHORASINCRONIZACAO = ?
  WHERE DFIDCARRETEIRO = ?;
`;

  await db.transaction(tx => {
    tx.executeSql(
      queryUpdate,
      [
        DFREGUAATRAS,
        DFDISTRIBUIR,
        DFIDCARRETEIRO,
        DFDATASINCRONIZACAO,
        DFHORASINCRONIZACAO,
      ],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) return true;
        return false;
      },
      _ => null,
    );
  });
};

export { updateTbConfiguracao };
