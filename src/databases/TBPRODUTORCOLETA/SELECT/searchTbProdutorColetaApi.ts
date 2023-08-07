import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { ProducerCollect } from '../../../types/producerCollect';

interface ISearchTbProdutorColetaApi {
  db: SQLiteDatabase;
  DFIDCOLETAAPP: string | number;
}
const searchTbProdutorColetaApi = ({
  db,
  DFIDCOLETAAPP,
}: ISearchTbProdutorColetaApi): Promise<ProducerCollect[] | null> => {
  const querySelect = `
  SELECT
  pr.DFIDITEMCOLETA,
  pr.DFIDPROPRIEDADE,
  pr.DFQTDENTRADA,
  pr.DFIDITEMCOLETAAPP,
  pr.DFDATACRIACAO
  FROM TBCOLETA co
  INNER JOIN TBITEMCOLETA it ON it.DFIDCOLETAAPP = co.DFIDCOLETAAPP
  INNER JOIN TBPRODUTORCOLETA pr ON pr.DFIDITEMCOLETAAPP = it.DFIDITEMCOLETAAPP
  WHERE co.DFIDCOLETAAPP = ?
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDCOLETAAPP], (tx, results) => {
          if (results.rows.length > 0) {
            const list: ProducerCollect[] = [];
            for (let i = 0; i <= results.rows.length - 1; i += 1) {
              list.push(results.rows.item(i));
            }
            resolve(list);
            return list;
          }
          const list: ProducerCollect[] = [];
          resolve(list);
          return list;
        });
      });
    } catch (error) {}
  });
};

export { searchTbProdutorColetaApi };
