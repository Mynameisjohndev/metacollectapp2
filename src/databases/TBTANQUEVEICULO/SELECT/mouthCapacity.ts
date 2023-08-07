import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { VehicleMouthData } from '../../../types/vehicleMouthData';

interface IMouthCapacity extends VehicleMouthData {
  db: SQLiteDatabase;
}
const mouthCapacity = ({
  db,
  DFIDITEMCOLETAAPP,
  DFBOCA,
}: IMouthCapacity): Promise<IMouthCapacity[]> => {
  const query = `
  SELECT DISTINCT ict.DFIDITEMCOLETAAPP, ba.DFVOLUME, ba.DFBOCA,ict.DFQTDPREVISTA,
  ict.DFQTDCOLETADA, tv.DFCAPACIDADE,ict.DFIDITEMCOLETA, co.DFIDCOLETAAPP
  FROM TBBOCAARMAZENADA AS ba
  INNER JOIN TBITEMCOLETA AS ict ON ba.DFIDITEMCOLETAAPP = ict.DFIDITEMCOLETAAPP
  INNER JOIN TBCOLETA AS co ON co.DFIDCOLETAAPP = ict.DFIDCOLETAAPP
  LEFT JOIN TBTANQUEVEICULO AS tv ON tv.DFIDVEICULO = co.DFIDVEICULO
  WHERE ict.DFIDITEMCOLETAAPP = ? AND ba.DFBOCA = ?`;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDITEMCOLETAAPP, DFBOCA], (_, results) => {
          const list: IMouthCapacity[] = [];
          for (let i = 0; i <= results.rows.length - 1; i += 1) {
            list.push(results.rows.item(i));
          }
          resolve(list);
          return list;
        });
      });
    } catch (error) {
      resolve([]);
      return [];
    }
  });
};

export { mouthCapacity };
