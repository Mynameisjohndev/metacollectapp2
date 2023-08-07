import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Config } from '../../../types/config';

interface ISelectWagonerConfig {
  db: SQLiteDatabase;
  DFIDCARRETEIRO: number;
}
const selectWagonerConfig = ({
  db,
  DFIDCARRETEIRO,
}: ISelectWagonerConfig): Promise<Config[]> => {
  const querySelect = `
  SELECT 
  DFIDCARRETEIRO, 
  DFDISTRIBUIR,
  DFREGUAATRAS,
  DFQUALIDADE,
  DFDATASINCRONIZACAO,
  DFHORASINCRONIZACAO,
  DFIMEI
  FROM TBCONFIGURACAO
  WHERE DFIDCARRETEIRO = ?;
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDCARRETEIRO], (tx, results) => {
          const list: Config[] = results.rows.raw();
          resolve(list);
          return list;
        });
      });
    } catch (_) {
      resolve([]);
      return [];
    }
  });
};

export { selectWagonerConfig };
