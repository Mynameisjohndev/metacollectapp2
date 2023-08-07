import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { VehicleMouthData } from '../../../types/vehicleMouthData';

interface ISumOfTotalVolume extends VehicleMouthData {
  db: SQLiteDatabase;
}
const sumOfTotalVolume = ({
  db,
  DFIDITEMCOLETAAPP,
  DFBOCA,
  DFIDCOLETAAPP,
}: ISumOfTotalVolume): Promise<ISumOfTotalVolume[]> => {
  const query = `
  SELECT DISTINCT sum(ba.DFVOLUME) AS DFVOLUME
  FROM TBBOCAARMAZENADA AS ba
  INNER JOIN TBITEMCOLETA AS ict ON ba.DFIDITEMCOLETAAPP = ict.DFIDITEMCOLETAAPP
  INNER JOIN TBCOLETA AS co ON co.DFIDCOLETAAPP = ict.DFIDCOLETAAPP
  WHERE ict.DFIDITEMCOLETAAPP != ? AND ba.DFBOCA = ? 
  AND co.DFIDCOLETAAPP = ?`;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [DFIDITEMCOLETAAPP, DFBOCA, DFIDCOLETAAPP],
          (_, results) => {
            const list = [];
            for (let i = 0; i <= results.rows.length - 1; i += 1) {
              list.push(results.rows.item(i));
            }
            resolve(list[0].DFVOLUME);
            return list[0].DFVOLUME;
          },
        );
      });
    } catch (error) {
      resolve([]);
      return [];
    }
  });
};

export { sumOfTotalVolume };
