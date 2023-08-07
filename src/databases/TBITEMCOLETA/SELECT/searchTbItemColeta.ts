import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { CollectItem } from '../../../types/collectItem';

interface ISearchTbItemColeta {
  db: SQLiteDatabase;
  DFIDITEMCOLETAAPP: number;
}
const searchTbItemColeta = ({
  db,
  DFIDITEMCOLETAAPP,
}: ISearchTbItemColeta): Promise<CollectItem[]> => {
  const querySelect = `
  SELECT 
  DFIDITEMCOLETA, 
  DFIDITEMCOLETAAPP,
  DFIDCOLETA,
  DFIDCOLETAAPP,
  DFALIZAROL,
  DFTIPOALIZAROL,
  DFSENSORIAL,
  DFCOLETOUAMOSTRA,
  DFCOLETOULACRE,
  DFTEMPERATURA,
  DFREGUAFRENTE,
  DFREGUAATRAS,
  DFQTDPREVISTA,
  DFQTDCOLETADA,
  DFIDTANQUE,
  DFQTDPREVISTA
  FROM TBITEMCOLETA
  WHERE DFIDITEMCOLETAAPP = ?
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDITEMCOLETAAPP], (tx, results) => {
          const list: CollectItem[] = results.rows.raw();
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

export { searchTbItemColeta };
