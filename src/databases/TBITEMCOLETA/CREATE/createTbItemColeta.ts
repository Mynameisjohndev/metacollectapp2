import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbItemColeta = (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS TBITEMCOLETA (
    DFIDITEMCOLETAAPP INTEGER PRIMARY KEY AUTOINCREMENT,
    DFIDITEMCOLETA INTEGER(11) NULL DEFAULT NULL,
    DFIDCOLETA INTEGER(11) NULL DEFAULT NULL,
    DFIDTANQUE INTEGER(11) NULL DEFAULT NULL,
    DFQTDPREVISTA FLOAT NULL DEFAULT NULL,
    DFQTDCOLETADA FLOAT NULL DEFAULT NULL,
    DFREGUAFRENTE FLOAT NULL DEFAULT NULL,
    DFREGUAATRAS FLOAT NULL DEFAULT NULL,
    DFTEMPERATURA FLOAT NULL DEFAULT NULL,
    DFHORACOLETA TIME NULL DEFAULT NULL,
    DFALIZAROL VARCHAR(1) NULL DEFAULT NULL,
    DFTIPOALIZAROL INTEGER(11) NULL DEFAULT NULL,
    DFSENSORIAL VARCHAR(50) NULL DEFAULT NULL,
    DFCOLETOUAMOSTRA VARCHAR(50) NULL DEFAULT NULL,
    DFCOLETOULACRE VARCHAR(50) NULL DEFAULT NULL,
    DFIDCOLETAAPP INTEGER(11) NULL DEFAULT NULL,
    DFIDITEMCOLETAERP INTEGER(11) NULL DEFAULT NULL,
    DFTIPOITEMCOLETA VARCHAR(1) NULL DEFAULT "N",
    CONSTRAINT FK_Tanque FOREIGN KEY (DFIDTANQUE) REFERENCES TBTANQUE (DFIDTANQUE),
    CONSTRAINT FK_Coleta FOREIGN KEY (DFIDCOLETAAPP) REFERENCES TBCOLETA (DFIDCOLETAAPP));`;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) return true;
        return false;
      });
    },
    () => createTbItemColeta(db),
  );
};

export { createTbItemColeta };
