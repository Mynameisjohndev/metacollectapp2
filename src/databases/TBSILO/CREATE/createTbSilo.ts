import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbSilo = (db: SQLiteDatabase) => {
  const query = `
    CREATE TABLE IF NOT EXISTS TBSILO ( 
    DFIDSILO INTEGER PRIMARY KEY,
    DFDESCRICAOSILO VARCHAR(60) NOT NULL,
    DFCAPACIDADE DECIMAL(14,2) NOT NULL,
    DFCOLETASELETIVA VARCHAR(1) NOT NULL DEFAULT '',
    DFIDUNIDADE INTEGER(11) NOT NULL DEFAULT '0',
    FOREIGN KEY (DFIDUNIDADE) REFERENCES TBUNIDADE (DFIDUNIDADE)
    
   );`;
  db.transaction(
    tx => {
      tx.executeSql(query, [], (_, results) => {
        if (results.rows.length >= 0) return true;
        return false;
      });
    },
    () => createTbSilo(db),
  );
};

export { createTbSilo };
