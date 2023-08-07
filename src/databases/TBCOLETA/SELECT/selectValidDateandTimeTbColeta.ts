import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { Collect } from '../../../types/collect';

interface ISelectValidDateandTimeTbColeta extends Collect {
  db: SQLiteDatabase;
}
const selectValidDateAndTimeTbColeta = ({
  db,
  DFDATASAIDA,
  DFHORASAIDA,
}: ISelectValidDateandTimeTbColeta) => {
  const querySelect = `
  SELECT co.DFSTATUS, co.DFDATASAIDA,co.DFHORASAIDA FROM TBCOLETA AS co 
    WHERE co.DFSTATUS = 'A' 
    AND co.DFHORASAIDA = '';
  `;

  const quertUpdate = `
    UPDATE TBCOLETA SET 
    DFDATASAIDA = ?, 
    DFHORASAIDA = ?
    WHERE DFSTATUS = 'A';
  `;

  db.transaction(tx => {
    tx.executeSql(querySelect, [], (tx, { rows }) => {
      if (rows.length > 0) {
        tx.executeSql(
          quertUpdate,
          [DFDATASAIDA, DFHORASAIDA],
          (_, { rows }) => {
            if (rows.length > 0) return true;
            return false;
          },
        );
      } else {
        return false;
      }
      return false;
    });
  });
};

export { selectValidDateAndTimeTbColeta };
