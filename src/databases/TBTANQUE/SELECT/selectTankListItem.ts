import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Collect } from '../../../types/collect';
import { tankListItem } from '../../../types/tankListItem';

interface ITankListItem extends Collect {
  db: SQLiteDatabase;
}
const selectTankListItem = async ({
  db,
  DFIDCOLETAAPP,
}: ITankListItem): Promise<tankListItem[]> => {
  const query = `
  SELECT ict.DFTIPOITEMCOLETA, ict.DFIDCOLETA,
  ict.DFIDITEMCOLETA,ict.DFIDITEMCOLETAAPP,tq.DFIDTANQUE, tq.DFDESCTANQUE, pp.DFNOMEPROPRIEDADE, pp.DFMATRICULA
  FROM TBITEMCOLETA ict 
  LEFT JOIN TBTANQUE as tq ON tq.DFIDTANQUE=ict.DFIDTANQUE
  INNER JOIN TBVINCULOTANQUE as vt ON vt.DFIDTANQUE=tq.DFIDTANQUE AND vt.DFPROPRIETARIO='S'
  INNER JOIN TBPROPRIEDADE as pp ON pp.DFIDPROPRIEDADE=vt.DFIDPROPRIEDADE
  WHERE ict.DFIDCOLETAAPP = ? ORDER BY tq.DFDESCTANQUE
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDCOLETAAPP], (_, results) => {
          const list: tankListItem[] = [];
          for (let i = 0; i <= results.rows.length - 1; i += 1) {
            list.push(results.rows.item(i));
          }
          resolve(list);
          return list;
        });
      });
    } catch (error) {}
  });
};
export { selectTankListItem };
