import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbCarreteiro = (db: SQLiteDatabase) => {
  const query = `
  CREATE TABLE IF NOT EXISTS TBCARRETEIRO (
    DFIDCARRETEIRO INTEGER(11) PRIMARY KEY NOT NULL,
    DFNOMECARRETEIRO VARCHAR(60) NOT NULL DEFAULT '',
    DFATIVO VARCHAR(1) NOT NULL DEFAULT '',
    DFCNPJCPFCEI VARCHAR(14) NOT NULL DEFAULT '',
    DFSENHA VARCHAR(6) NOT NULL DEFAULT '',
    DFIDVEICULO INTEGER(11) NOT NULL DEFAULT NULL,
    DFLOGIN VARCHAR(25) NOT NULL DEFAULT NULL,

    FOREIGN KEY (DFIDVEICULO) REFERENCES TBVEICULO (DFIDVEICULO)
  )
  `;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) {
          return true;
        }
      });
    },
    () => createTbCarreteiro(db),
  );
};

export { createTbCarreteiro };
