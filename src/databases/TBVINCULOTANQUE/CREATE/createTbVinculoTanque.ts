import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbVinculoTanque = (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS TBVINCULOTANQUE(
    DFPROPRIETARIO VARCHAR(11) NOT NULL,
    DFIDTANQUE INTEGER(11) NOT NULL,
    DFIDPROPRIEDADE INTEGER(11) NOT NULL DEFAULT '',
    CONSTRAINT pk PRIMARY KEY (DFIDTANQUE,DFIDPROPRIEDADE),
    CONSTRAINT FK_Taque FOREIGN KEY (DFIDTANQUE) REFERENCES TBTANQUE (DFIDTANQUE),
    CONSTRAINT FK_Propriedade FOREIGN KEY (DFIDPROPRIEDADE) REFERENCES TBPROPRIEDADE (DFIDPROPRIEDADE));`;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) return true;
        return false;
      });
    },
    () => createTbVinculoTanque(db),
  );
};
export { createTbVinculoTanque };
