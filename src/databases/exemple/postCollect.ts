import { SQLiteDatabase } from 'react-native-sqlite-storage';

interface ICreateCollect {
  db: SQLiteDatabase;
  name: string;
  age: string;
}

const postCollect = async ({
  db,
  name,
  age,
}: ICreateCollect): Promise<void> => {
  const query = 'INSERT INTO TBCOLLLECT (name, age) VALUES (?,?)';
  await db.transaction(tx => {
    tx.executeSql(query, [name, age]);
  });
};
export { postCollect };
