import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Vehicle } from '../../../types/vehicle';

interface IGETTbVeiculo {
  db: SQLiteDatabase;
}
const selectTbVeiculo = async ({ db }: IGETTbVeiculo): Promise<Vehicle[]> => {
  const querySelect = `
    SELECT * FROM  TBVEICULO ORDER BY DFPLACAVEICULO
  `;
  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(querySelect, [], (_, results) => {
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

export { selectTbVeiculo };
