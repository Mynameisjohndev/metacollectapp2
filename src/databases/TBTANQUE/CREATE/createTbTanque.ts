import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbTanque = (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS TBTANQUE(
    DFIDTANQUE INTEGER(11) PRIMARY KEY NOT NULL,
    DFDESCTANQUE VARCHAR(35) NOT NULL DEFAULT '',
    DFIDLINHA INTEGER(11) NULL DEFAULT NULL,
    DFATIVO VARCHAR(1) NOT NULL DEFAULT '',
    DFCOLETASELETIVA VARCHAR(1) NOT NULL DEFAULT '',
    FOREIGN KEY (DFIDLINHA) REFERENCES TBLINHA (DFIDLINHA));`;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) return true;
        return false;
      });
    },
    () => createTbTanque(db),
  );
};

export { createTbTanque };
