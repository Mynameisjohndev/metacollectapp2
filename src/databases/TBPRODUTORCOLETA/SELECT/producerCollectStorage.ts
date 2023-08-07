import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { ProducerData } from '../../../types/producerData';

interface IProducerDataResearch {
  db: SQLiteDatabase;
  DFIDPROPRIEDADE: string;
  DFIDITEMCOLETAAPP: string;
}

const producerDataResearch = ({
  db,
  DFIDPROPRIEDADE,
  DFIDITEMCOLETAAPP,
}: IProducerDataResearch): Promise<ProducerData[]> => {
  const query = `
  SELECT * FROM TBPRODUTORCOLETA 
  WHERE DFIDPROPRIEDADE = ? AND DFIDITEMCOLETAAPP = ?
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [DFIDPROPRIEDADE, DFIDITEMCOLETAAPP],
          (tx, results) => {
            if (results.rows.length > 0) {
              const list = [];
              // for (let i = 0; i <= results.rows.length - 1; i += 1) {
              //   list.push(results.rows.item(i));
              // }
              resolve(list);
              return list;
            }
            return null;
          },
        );
      });
    } catch (error) {
      resolve(null);
      return null;
    }
  });
};

export { producerDataResearch };
