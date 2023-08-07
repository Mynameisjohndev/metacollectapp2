import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { tankListItem } from '../../../types/tankListItem';

interface ITankItemColeta {
  db: SQLiteDatabase;
  DFIDTANQUE: number;
  DFIDCOLETAAPP: number;
}

const selectCollectItemByTankAndCollectId = ({
  db,
  DFIDTANQUE,
  DFIDCOLETAAPP,
}: ITankItemColeta): Promise<tankListItem> => {
  const query = `
  SELECT ict.DFTIPOITEMCOLETA, ict.DFIDCOLETA,
  ict.DFIDITEMCOLETA,ict.DFIDITEMCOLETAAPP,tq.DFIDTANQUE, tq.DFDESCTANQUE, pp.DFNOMEPROPRIEDADE, pp.DFMATRICULA
  FROM TBITEMCOLETA ict 
  LEFT JOIN TBTANQUE as tq ON tq.DFIDTANQUE=ict.DFIDTANQUE
  INNER JOIN TBVINCULOTANQUE as vt ON vt.DFIDTANQUE=tq.DFIDTANQUE AND vt.DFPROPRIETARIO='S'
  INNER JOIN TBPROPRIEDADE as pp ON pp.DFIDPROPRIEDADE=vt.DFIDPROPRIEDADE
  WHERE ict.DFIDTANQUE = ? AND ict.DFIDCOLETAAPP = ?
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDTANQUE, DFIDCOLETAAPP], (_, results) => {
          const collectItem = results.rows.item(0);
          if (collectItem) {
            resolve(collectItem);
            return collectItem;
          }
          resolve(undefined);
          return undefined;
        });
      });
    } catch (error) {
      resolve(undefined);
      return undefined;
    }
  });
};

export { selectCollectItemByTankAndCollectId };
