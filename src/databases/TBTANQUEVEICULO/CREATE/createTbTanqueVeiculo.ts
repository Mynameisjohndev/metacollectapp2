import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbTanqueVeiculo = (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS TBTANQUEVEICULO (
    DFIDVEICULO INTEGER(11) NOT NULL,
    DFBOCA INTEGER(11) NOT NULL,
    DFCAPACIDADE FLOAT NOT NULL DEFAULT '0',
    DFCOLETASELETIVA VARCHAR(1) NOT NULL DEFAULT 'N',
    CONSTRAINT pk PRIMARY KEY (DFBOCA,DFIDVEICULO),
    FOREIGN KEY (DFIDVEICULO) REFERENCES TBVEICULO (DFIDVEICULO))`;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) return true;
        return false;
      });
    },
    () => createTbTanqueVeiculo(db),
  );
};

export { createTbTanqueVeiculo };
