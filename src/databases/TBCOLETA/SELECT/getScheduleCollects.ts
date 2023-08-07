import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { IScheduleCollect } from '../../../types/scheduleCollect';

interface IGetScheduleCollects {
  db: SQLiteDatabase;
  DFIDCARRETEIRO: string;
}
const getScheduleCollects = ({
  db,
  DFIDCARRETEIRO,
}: IGetScheduleCollects): Promise<IScheduleCollect[]> => {
  const query = `
  SELECT co.DFIDCARRETEIRO, co.DFIDCOLETA, co.DFIDCOLETAAPP, 
  ve.DFPLACAVEICULO, re.DFDESCREGIONAL, co.DFDATAPROGRAMADA, li.DFNOMELINHA
  FROM TBCOLETA AS co
  INNER JOIN TBVEICULO AS ve ON ve.DFIDVEICULO = co.DFIDVEICULO
  INNER JOIN TBREGIONAL AS re ON re.DFIDREGIONAL = co.DFIDREGIONAL
  INNER JOIN TBLINHA AS li ON li.DFIDLINHA = co.DFIDLINHA
  WHERE co.DFIDCARRETEIRO = ? AND co.DFSTATUS = 'P'
  ORDER BY co.DFIDCOLETAAPP ASC
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDCARRETEIRO], (tx, results) => {
          const list = results.rows.raw();
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

export { getScheduleCollects };
