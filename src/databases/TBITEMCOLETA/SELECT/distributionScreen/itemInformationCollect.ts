import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../../types/collectItem';

interface IItemInformationCollect extends CollectItem {
  db: SQLiteDatabase;
}

const itemInformationCollect = ({
  db,
  DFIDITEMCOLETAAPP,
}: IItemInformationCollect): Promise<CollectItem[] | null> => {
  const query = `
  SELECT *
  FROM TBITEMCOLETA 
  WHERE DFIDITEMCOLETAAPP = ?;
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDITEMCOLETAAPP], (tx, results) => {
          if (results.rows.length > 0) {
            const list = [];
            for (let i = 0; i <= results.rows.length - 1; i += 1) {
              list.push(results.rows.item(i));
            }
            resolve(list);
            return list;
          }
          resolve(null);
          return null;
        });
      });
    } catch (error) {
      resolve(null);
      return null;
    }
  });
};

export { itemInformationCollect };
