import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { VehicleMouthData } from '../../../types/vehicleMouthData';

interface IVehicleMouthData extends VehicleMouthData {
  db: SQLiteDatabase;
}
const vehicleMouthData = ({
  db,
  DFIDCOLETAAPP,
}: IVehicleMouthData): Promise<IVehicleMouthData[]> => {
  const query = `
  SELECT DISTINCT tv.DFIDVEICULO, tv.DFBOCA, tv.DFCAPACIDADE, tv.DFCOLETASELETIVA
  FROM TBITEMCOLETA AS ict
  INNER JOIN TBCOLETA AS co ON co.DFIDCOLETAAPP = ict.DFIDCOLETAAPP
  INNER JOIN TBTANQUEVEICULO AS tv ON tv.DFIDVEICULO = co.DFIDVEICULO
  WHERE ict.DFIDCOLETAAPP = ?`;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDCOLETAAPP], (tx, results) => {
          const list: IVehicleMouthData[] = [];
          if (results.rows.length > 0) {
            for (let i = 0; i <= results.rows.length - 1; i += 1) {
              list.push(results.rows.item(i));
            }
            resolve(list);
            return list;
          }
          resolve(list);
          return list;
        });
      });
    } catch (error) {}
  });
};

export { vehicleMouthData };
