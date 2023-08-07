import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { currentDate } from '../../../utils/getCurrentDate';

interface IInsertProdutorColeta {
  db: SQLiteDatabase;
  DFIDITEMCOLETAAPP: number;
  DFIDPROPRIEDADE: number;
  DFQTDENTRADA: number;
}
const insertProdutorColeta = ({
  db,
  DFIDITEMCOLETAAPP,
  DFIDPROPRIEDADE,
  DFQTDENTRADA,
}: IInsertProdutorColeta): Promise<boolean> => {
  const DFDATACRIACAO: string = currentDate();
  const query = `
  INSERT INTO TBPRODUTORCOLETA (
    DFIDITEMCOLETAAPP,
    DFIDPROPRIEDADE,
    DFQTDENTRADA,
    DFDATACRIACAO
  ) VALUES (?,?,?,?);
  `;
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [DFIDITEMCOLETAAPP, DFIDPROPRIEDADE, DFQTDENTRADA, DFDATACRIACAO],
        (tx, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(true);
            return true;
          }
          resolve(false);
          return false;
        },
        _ => null,
      );
    });
  });
};
export { insertProdutorColeta };
