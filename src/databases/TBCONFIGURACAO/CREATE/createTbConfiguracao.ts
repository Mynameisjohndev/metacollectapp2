import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbConfiguracao = (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS TBCONFIGURACAO (
    DFIDCARRETEIRO INTEGER PRIMARY KEY,
    DFREGUAATRAS VARCHAR(1) NOT NULL DEFAULT 'N',
    DFDISTRIBUIR VARCHAR(1) NOT NULL DEFAULT 'S',
    DFQUALIDADE VARCHAR(1) NOT NULL DEFAULT 'S',
    DFDATASINCRONIZACAO DATE NULL DEFAULT NULL,
    DFIMEI VARCHAR(25) NOT NULL DEFAULT NULL,
    DFHORASINCRONIZACAO TIME NULL DEFAULT NULL);`;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) return true;
        return false;
      });
    },
    () => createTbConfiguracao(db),
  );
};

export { createTbConfiguracao };
