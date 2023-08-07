import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbRegional = (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS TBREGIONAL (
  DFIDREGIONAL INTEGER(11) PRIMARY KEY NOT NULL,
  DFDESCREGIONAL VARCHAR(40) NOT NULL DEFAULT '');`;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) return true;
        return false;
      });
    },
    () => createTbRegional(db),
  );
};

export { createTbRegional };
