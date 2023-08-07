import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbPropriedade = (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS TBPROPRIEDADE (
    DFIDPROPRIEDADE INTEGER(11) PRIMARY KEY NOT NULL,
    DFMATRICULA VARCHAR(12) NOT NULL DEFAULT '',
    DFCNPJCPFCEI VARCHAR(14) NOT NULL DEFAULT '',
    DFNOMEPRODUTOR VARCHAR(60) NULL DEFAULT '',
    DFNOMEPROPRIEDADE VARCHAR(35) NULL DEFAULT '',
    DFNOMEMUNICIPIO VARCHAR(40) NULL DEFAULT '',
    DFIDSIGLAUF VARCHAR(2) NULL DEFAULT '',
    DFLOGRADOURO VARCHAR(200) NULL DEFAULT '',
    DFNUMERO VARCHAR(10) NULL DEFAULT '',
    DFATIVOINATIVO VARCHAR(1) NULL DEFAULT '');`;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) return true;
        return false;
      });
    },
    () => createTbPropriedade(db),
  );
};
export { createTbPropriedade };
