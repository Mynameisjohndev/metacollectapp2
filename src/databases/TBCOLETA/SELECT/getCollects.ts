import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Collect } from '../../../types/collect';

interface IGetCollects {
  db: SQLiteDatabase;
  DFSTATUS: string;
}

const getCollects = ({ db, DFSTATUS }: IGetCollects): Promise<Collect[]> => {
  const query = 'SELECT * FROM TBCOLETA WHERE DFSTATUS=?';

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFSTATUS], (_, results) => {
          const list: Collect[] = results.rows.raw();
          resolve(list);
          return list;
        });
      });
    } catch (error) {
      resolve([]);
      return [];
    }
  });
};

export { getCollects };
