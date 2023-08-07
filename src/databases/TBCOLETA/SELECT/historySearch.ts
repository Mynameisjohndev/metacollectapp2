import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { TypeHistorySearch } from '../../../types/typeHistorySearch';

interface IHistorySearch extends TypeHistorySearch {
  db: SQLiteDatabase;
}
const historySearch = ({
  db,
  DFIDCARRETEIRO,
}: IHistorySearch): Promise<TypeHistorySearch[]> => {
  const query = `
  SELECT co.DFIDCARRETEIRO, co.DFIDCOLETA, co.DFIDCOLETAAPP, 
  ve.DFPLACAVEICULO, re.DFDESCREGIONAL, co.DFDATAPROGRAMADA, li.DFNOMELINHA
  FROM TBCOLETA AS co
  INNER JOIN TBVEICULO AS ve ON ve.DFIDVEICULO = co.DFIDVEICULO
  INNER JOIN TBREGIONAL AS re ON re.DFIDREGIONAL = co.DFIDREGIONAL
  INNER JOIN TBLINHA AS li ON li.DFIDLINHA = co.DFIDLINHA
  WHERE co.DFIDCARRETEIRO = ? AND co.DFSTATUS == 'D' OR co.DFSTATUS == 'F'
  ORDER BY co.DFIDCOLETAAPP DESC
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

export { historySearch };
