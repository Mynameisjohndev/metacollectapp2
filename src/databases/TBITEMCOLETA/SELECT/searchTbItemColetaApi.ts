import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../types/collectItem';

interface ISearchTbItemColetaApi extends CollectItem {
  db: SQLiteDatabase;
}
const searchTbItemColetaApi = ({
  db,
  DFIDCOLETAAPP,
}: ISearchTbItemColetaApi): Promise<CollectItem[]> => {
  const querySelect = `
  SELECT 
  ict.DFALIZAROL,
  ict.DFCOLETOUAMOSTRA,
  ict.DFCOLETOULACRE,
  ict.DFHORACOLETA,
  ict.DFIDCOLETA,
  ict.DFIDCOLETAAPP,
  ict.DFIDITEMCOLETA,
  ict.DFIDITEMCOLETAAPP,
  ict.DFIDITEMCOLETAERP,
  ict.DFIDTANQUE,
  ict.DFQTDCOLETADA,
  ict.DFQTDPREVISTA,
  ict.DFREGUAATRAS,
  ict.DFREGUAFRENTE,
  ict.DFSENSORIAL,
  ict.DFTEMPERATURA,
  ict.DFTIPOALIZAROL,
  ict.DFTIPOITEMCOLETA
  FROM TBITEMCOLETA AS ict
  INNER JOIN TBVINCULOTANQUE AS vt ON vt.DFIDTANQUE = ict.DFIDTANQUE AND vt.DFPROPRIETARIO='S'
  INNER JOIN TBPROPRIEDADE as pp ON pp.DFIDPROPRIEDADE=vt.DFIDPROPRIEDADE
  WHERE DFIDCOLETAAPP = ?
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDCOLETAAPP], (tx, results) => {
          if (results.rows.length > 0) {
            const list = [];
            for (let i = 0; i <= results.rows.length - 1; i += 1) {
              list.push(results.rows.item(i));
            }
            resolve(list);
            return list;
          }
          resolve([]);
          return [];
        });
      });
    } catch (error) {
      resolve([]);
      return [];
    }
  });
};

export { searchTbItemColetaApi };
