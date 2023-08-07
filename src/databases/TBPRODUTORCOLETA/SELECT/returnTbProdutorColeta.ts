import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { ProducerCollect } from '../../../types/producerCollect';

interface IReturnTbProdutorColeta extends ProducerCollect {
  db: SQLiteDatabase;
}

const returnTbProdutorColeta = ({
  db,
  DFIDITEMCOLETAAPP,
  DFIDPROPRIEDADE,
}: IReturnTbProdutorColeta): Promise<ProducerCollect[]> => {
  const query = `
  SELECT * 
  FROM TBPRODUTORCOLETA
  WHERE DFIDITEMCOLETAAPP = ? AND
  DFIDPROPRIEDADE = ?
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [DFIDITEMCOLETAAPP, DFIDPROPRIEDADE],
          (tx, results) => {
            const list = results.rows.raw();
            resolve(list);
            return list;
          },
        );
      });
    } catch (_) {
      resolve([]);
      return [];
    }
  });
};

export { returnTbProdutorColeta };
