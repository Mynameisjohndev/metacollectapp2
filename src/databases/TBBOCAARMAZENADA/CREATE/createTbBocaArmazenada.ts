import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbBocaArmazenada = (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS TBBOCAARMAZENADA (
    DFIDITEMCOLETAAPP INTEGER(11) NOT NULL DEFAULT '0',
    DFIDITEMCOLETA NULL DEFAULT NULL,
    DFBOCA INTEGER(11) NOT NULL DEFAULT '0',
    DFVOLUME FLOAT NULL DEFAULT NULL,
    CONSTRAINT pk PRIMARY KEY (DFIDITEMCOLETAAPP,DFBOCA),
    CONSTRAINT FK_TBBOCAARMAZENADA_TBITEMCOLETA FOREIGN KEY (DFIDITEMCOLETAAPP) REFERENCES TBITEMCOLETA (DFIDITEMCOLETAAPP));`;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) {
          return true;
        }
      });
    },
    () => createTbBocaArmazenada(db),
  );
};

export { createTbBocaArmazenada };
