import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { ProducerData } from '../../../../types/producerData';

interface IProducerDataResearch {
  db: SQLiteDatabase;
  DFIDCOLETAAPP: number;
  DFIDITEMCOLETAAPP: number;
}

const producerDataResearch = ({
  db,
  DFIDITEMCOLETAAPP,
}: IProducerDataResearch): Promise<ProducerData[]> => {
  const query = `
  SELECT pc.DFIDITEMCOLETAAPP,
  pp.DFNOMEPRODUTOR, pp.DFMATRICULA, pp.DFIDPROPRIEDADE
  FROM TBPRODUTORCOLETA as pc
  INNER JOIN TBPROPRIEDADE as pp ON pp.DFIDPROPRIEDADE = pc.DFIDPROPRIEDADE
  WHERE pc.DFIDITEMCOLETAAPP = ?
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDITEMCOLETAAPP], (_, results) => {
          let list = results.rows.raw();
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

export { producerDataResearch };
