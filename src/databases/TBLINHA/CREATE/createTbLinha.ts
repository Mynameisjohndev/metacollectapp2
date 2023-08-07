import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbLinha = (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS TBLINHA (
    DFIDLINHA INTEGER(11) PRIMARY KEY NOT NULL,
    DFNOMELINHA VARCHAR(75) NOT NULL DEFAULT '',
    DFATIVO VARCHAR(1) NULL DEFAULT '',
    DFIDREGIONAL INTEGER(11) NULL DEFAULT '0',
    DFIDUNIDADE INTEGER(11) NULL DEFAULT '0',
    DFIDCARRETEIRO INTEGER(11) NULL DEFAULT '0',
    CONSTRAINT FK_Regional FOREIGN KEY (DFIDREGIONAL) REFERENCES TBREGIONAL (DFIDREGIONAL),
    CONSTRAINT FK_Unidade FOREIGN KEY (DFIDUNIDADE) REFERENCES TBUNIDADE (DFIDUNIDADE),
    CONSTRAINT FK_Carreteiro FOREIGN KEY (DFIDCARRETEIRO) REFERENCES TBCARRETEIRO (DFIDCARRETEIRO));`;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) return true;
        return false;
      });
    },
    () => createTbLinha(db),
  );
};

export { createTbLinha };
