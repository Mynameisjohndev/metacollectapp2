import { SQLiteDatabase } from 'react-native-sqlite-storage';

const createTbCollect = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS TBCOLLECT 
  (ID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT AUTOINCREMENT, age TEXT NOT NULL)`;

  await db.transaction(tx => {
    tx.executeSql(query, [], (_, results) => {
      if (results.rows.length >= 0) {
        // console.log(`Criou a tabela TBteste`);
      } else {
        // console.log('error na consulta');
      }
    });
  });
};

export { createTbCollect };
