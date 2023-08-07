import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbUnidade = (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS TBUNIDADE (
    DFIDUNIDADE INTEGER(11) PRIMARY KEY NOT NULL, 
    DFRAZSOCUNIDADE VARCHAR(60) NOT NULL, 
    DFCNPJCPFCEI VARCHAR(14) NOT NULL,
    DFNOMEFANTASIA VARCHAR(60) NULL DEFAULT NULL
  );`;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) return true;
        return false;
      });
    },
    () => createTbUnidade(db),
  );
};

export { createTbUnidade };
