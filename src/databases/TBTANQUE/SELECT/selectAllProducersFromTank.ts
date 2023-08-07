import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { TankBond } from '../../../types/tankBond';

interface ISelectAllProducersFromTank extends TankBond {
  db: SQLiteDatabase;
}
const selectAllProducersFromTank = ({
  db,
  DFIDTANQUE,
}: ISelectAllProducersFromTank): Promise<TankBond[]> => {
  const query = `
    SELECT
      tq.DFIDTANQUE, tq.DFDESCTANQUE, pp.DFNOMEPRODUTOR, pp.DFMATRICULA, vt.DFPROPRIETARIO
     FROM TBVINCULOTANQUE AS vt 
     LEFT JOIN TBTANQUE as tq ON tq.DFIDTANQUE=vt.DFIDTANQUE
     LEFT JOIN TBPROPRIEDADE as pp ON pp.DFIDPROPRIEDADE=vt.DFIDPROPRIEDADE
     WHERE tq.DFIDTANQUE = ?`;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(query, [DFIDTANQUE], (_, results) => {
          const list = [];
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
export { selectAllProducersFromTank };
