import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { VehicleTank } from '../../../types/vehicleTank';

interface IVehicleMouthData {
  db: SQLiteDatabase;
  DFIDVEICULO: number;
}
const selectTankVehicleByVehicleId = ({
  db,
  DFIDVEICULO,
}: IVehicleMouthData): Promise<VehicleTank[]> => {
  const query = `
  SELECT * FROM TBTANQUEVEICULO
  WHERE DFIDVEICULO = ?`;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDVEICULO], (tx, results) => {
          const list: IVehicleMouthData[] = results.rows.raw();
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

export { selectTankVehicleByVehicleId };
