import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbItemRegistro = (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS TBITEMREGISTRO (
    DFIDITEMREGISTROAPP INTEGER PRIMARY KEY AUTOINCREMENT,
    DFIDITEMREGISTRO INTEGER(11) NULL DEFAULT NULL,
    DFREGISTROIMAGEM BLOB NULL DEFAULT NULL,
    DFIDREGISTRO INTEGER(11) NULL DEFAULT NULL,
    DFIDREGISTROAPP INTEGER(11) NULL DEFAULT NULL,
    DFITEMREGISTROENVIADO VARCHAR(1) NULL DEFAULT 'N',
    FOREIGN KEY (DFIDREGISTROAPP) REFERENCES TBREGISTRO (DFIDREGISTROAPP));`;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) return true;
        return false;
      });
    },
    () => createTbItemRegistro(db),
  );
};

export { createTbItemRegistro };
