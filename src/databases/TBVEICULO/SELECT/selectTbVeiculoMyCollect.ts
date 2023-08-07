import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Vehicle } from '../../../types/vehicle';

interface IGETTbVeiculo extends Vehicle {
  db: SQLiteDatabase;
}
const selectTbVeiculoMyCollect = async ({
  db,
  DFIDVEICULO,
}: IGETTbVeiculo): Promise<Vehicle[]> => {
  const querySelect = `
    SELECT DFDESCVEICULO FROM TBVEICULO WHERE DFIDVEICULO = ?;
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [DFIDVEICULO], (_, results) => {
          const list: Vehicle[] = [];
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

export { selectTbVeiculoMyCollect };
