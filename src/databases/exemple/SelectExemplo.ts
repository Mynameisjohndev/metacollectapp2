import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface IGETTbUnidade {
  db: SQLiteDatabase;
}

const SelectTbSilo = async ({ db }: IGETTbUnidade) => {
  const querySelect = `
    SELECT * FROM TBSILO
  `;

  await db.transaction(tx => {
    tx.executeSql(querySelect, [], (_, results) => {
      const list = [];
      for (let i = 0; i <= results.rows.length - 1; i += 1) {
        list.push(results.rows.item(i));
      }
    });
  });
};

export { SelectTbSilo };
