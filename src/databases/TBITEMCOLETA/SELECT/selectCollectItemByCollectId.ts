import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../types/collectItem';

interface ISelectCollectItemByCollectId {
  db: SQLiteDatabase;
  DFIDCOLETAAPP: number;
}
const selectCollectItemByCollectId = ({
  db,
  DFIDCOLETAAPP,
}: ISelectCollectItemByCollectId): Promise<CollectItem[]> => {
  const query = `
  SELECT * FROM TBITEMCOLETA AS ict
  INNER JOIN TBTANQUE AS ta ON ta.DFIDTANQUE = ict.DFIDTANQUE
  INNER JOIN TBVINCULOTANQUE as vt ON vt.DFIDTANQUE = ta.DFIDTANQUE
  WHERE ict.DFIDCOLETAAPP = ?  AND vt.DFPROPRIETARIO = "S" `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDCOLETAAPP], (tx, results) => {
          const list: CollectItem[] = results.rows.raw();
          resolve(list);
          return list;
        });
      });
    } catch (_) {
      resolve([]);
      return [];
    }
  });
};

export { selectCollectItemByCollectId };
