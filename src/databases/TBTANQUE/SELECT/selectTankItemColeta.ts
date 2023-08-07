import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../types/collectItem';

interface ITankItemColeta extends CollectItem {
  db: SQLiteDatabase;
}
const selectTankItemColeta = ({
  db,
  DFIDITEMCOLETAAPP,
  DFIDTANQUE,
}: ITankItemColeta): Promise<CollectItem[]> => {
  const query = `
  SELECT DFQTDPREVISTA, DFQTDCOLETADA FROM TBITEMCOLETA WHERE DFIDITEMCOLETAAPP = ? AND DFIDTANQUE = ?
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDITEMCOLETAAPP, DFIDTANQUE], (_, results) => {
          const list: CollectItem[] = [];
          for (let i = 0; i <= results.rows.length - 1; i += 1) {
            list.push(results.rows.item(i));
          }
          resolve(list);
          return list;
        });
      });
    } catch (error) {}
  });
};

export { selectTankItemColeta };
