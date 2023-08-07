/* eslint-disable no-param-reassign */
import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { ProducerCollect } from '../../../types/producerCollect';

interface ISelectTankListProducersInfo {
  db: SQLiteDatabase;
  DFIDITEMCOLETAAPP: number;
}

const selectTankListProducersInfo = ({
  db,
  DFIDITEMCOLETAAPP,
}: ISelectTankListProducersInfo): Promise<string> => {
  const producers = `SELECT * FROM TBPRODUTORCOLETA WHERE DFIDITEMCOLETAAPP = ? `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(producers, [DFIDITEMCOLETAAPP], (tx, results) => {
          const producers = results.rows.raw();
          let value = 0;
          const storageMilk = producers.reduce(
            (acumulador, producer: ProducerCollect) => {
              if (Number(producer.DFQTDENTRADA) > 0) {
                acumulador += Number(producer.DFQTDENTRADA);
                value += 1;
              }
              return acumulador;
            },
            0,
          );
          const message = `${value}/${producers.length} - ${storageMilk} Litros`;
          resolve(message);
          return message;
        });
      });
    } catch (_) {
      resolve('');
      return '';
    }
  });
};

export { selectTankListProducersInfo };
