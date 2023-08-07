import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Config } from '../../../types/config';
import { currentDate } from '../../../utils/getCurrentDate';

interface ISelectWagonerConfig {
  db: SQLiteDatabase;
  DFIDCARRETEIRO: number;
}

const selectLastSynchronization = ({
  DFIDCARRETEIRO,
  db,
}: ISelectWagonerConfig): Promise<boolean> => {
  const query =
    'SELECT DFDATASINCRONIZACAO FROM TBCONFIGURACAO WHERE DFIDCARRETEIRO = ?';

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDCARRETEIRO], (tx, results) => {
          const config = results.rows.raw() as Config[];
          // console.log({
          //   ultima: config[0].DFDATASINCRONIZACAO,
          //   hoje: currentDate(),
          // });
          if (config.length > 0) {
            // if (config[0].DFDATASINCRONIZACAO === '2023-04-19') {
            if (config[0].DFDATASINCRONIZACAO === currentDate()) {
              // console.log('JA SINCRONIZOU HOJE');
              resolve(true);
              return true;
            }
          }
          // console.log('NÃO SINCRONIZOU HOJE');
          resolve(false);
          return false;
        });
      });
    } catch (error) {
      resolve(false);
      return false;
    }
  });
};

export { selectLastSynchronization };
