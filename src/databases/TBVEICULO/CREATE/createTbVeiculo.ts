import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbVeiculo = (db: SQLiteDatabase) => {
  const query = `
  CREATE TABLE IF NOT EXISTS TBVEICULO (
    DFIDVEICULO INTEGER(11) PRIMARY KEY NOT NULL,
    DFDESCVEICULO VARCHAR(40) NOT NULL DEFAULT '',
    DFATIVO VARCHAR(1) NOT NULL DEFAULT '',
    DFPLACAVEICULO VARCHAR(8) NOT NULL DEFAULT ''
  );
  `;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) return true;
        return false;
      });
    },
    () => createTbVeiculo(db),
  );
};

export { createTbVeiculo };
