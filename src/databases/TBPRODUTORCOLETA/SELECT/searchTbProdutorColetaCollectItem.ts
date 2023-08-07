import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { ProducerCollect } from '../../../types/producerCollect';

interface ISearchTbProdutorColetaCollectItem {
  db: SQLiteDatabase;
  DFIDITEMCOLETAAPP: string | number;
}
const searchTbProdutorColetaCollectItem = ({
  db,
  DFIDITEMCOLETAAPP,
}: ISearchTbProdutorColetaCollectItem): Promise<ProducerCollect[] | null> => {
  const querySelect = `
  SELECT
  pr.DFIDITEMCOLETA,
  pr.DFIDPROPRIEDADE,
  pr.DFQTDENTRADA,
  pr.DFIDITEMCOLETAAPP
  FROM TBCOLETA co
  INNER JOIN TBITEMCOLETA it ON it.DFIDCOLETAAPP = co.DFIDCOLETAAPP
  INNER JOIN TBPRODUTORCOLETA pr ON pr.DFIDITEMCOLETAAPP = it.DFIDITEMCOLETAAPP
  WHERE it.DFIDITEMCOLETAAPP = ?
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDITEMCOLETAAPP], (tx, results) => {
          const list: ProducerCollect[] = results.rows.raw();
          for (let i = 0; i <= results.rows.length - 1; i += 1) {
            list.push(results.rows.item(i));
          }
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

export { searchTbProdutorColetaCollectItem };
