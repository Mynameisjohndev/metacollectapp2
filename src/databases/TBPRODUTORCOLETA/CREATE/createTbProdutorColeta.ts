import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbProdutorColeta = (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS TBPRODUTORCOLETA (
    DFIDITEMCOLETAAPP INTEGER(11) NOT NULL DEFAULT NULL,
    DFIDITEMCOLETA INTEGER(11) NULL DEFAULT NULL,
    DFIDPROPRIEDADE INTEGER(11) NOT NULL DEFAULT NULL,
    DFQTDENTRADA FLOAT NULL DEFAULT NULL,
    DFDATACRIACAO DATE NULL DEFAULT NULL,
    CONSTRAINT pk PRIMARY KEY (DFIDITEMCOLETAAPP,DFIDPROPRIEDADE),
    CONSTRAINT FK_ItemColeta  FOREIGN KEY (DFIDITEMCOLETAAPP) REFERENCES TBITEMCOLETA (DFIDITEMCOLETAAPP));`;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) return true;
        return false;
      });
    },
    () => createTbProdutorColeta(db),
  );
};

export { createTbProdutorColeta };
