import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Collect } from '../../../types/collect';

interface IGelectScheduledCollectByInformation {
  db: SQLiteDatabase;
  DFIDVEICULO: number;
  DFIDREGIONAL: number;
  DFIDLINHA: number;
}

const selectScheduledCollectByInformation = ({
  db,
  DFIDVEICULO,
  DFIDREGIONAL,
  DFIDLINHA,
}: IGelectScheduledCollectByInformation): Promise<Collect> => {
  const query = `
    SELECT * FROM TBCOLETA 
    WHERE DFIDVEICULO = ? 
    AND DFIDREGIONAL = ?
    AND DFIDLINHA = ? 
    AND DFSTATUS = "P" 
    LIMIT 1
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [DFIDVEICULO, DFIDREGIONAL, DFIDLINHA],
          (_, results) => {
            const list: Collect[] = results.rows.raw();
            resolve(list[0]);
            return list[0];
          },
        );
      });
    } catch (_) {
      resolve(undefined);
      return undefined;
    }
  });
};

export { selectScheduledCollectByInformation };
