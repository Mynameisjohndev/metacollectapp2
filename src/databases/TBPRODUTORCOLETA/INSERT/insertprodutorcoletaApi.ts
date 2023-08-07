import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { ProducerCollect } from '../../../types/producerCollect';

interface IInsertProdutorColetaApi {
  db: SQLiteDatabase;
  producerCollect: ProducerCollect;
  DFIDITEMCOLETAAPP: string | number;
}
const insertProdutorColetaApi = async ({
  db,
  producerCollect,
  DFIDITEMCOLETAAPP,
}: IInsertProdutorColetaApi): Promise<string | number> => {
  const { DFIDITEMCOLETA, DFIDPROPRIEDADE, DFQTDENTRADA, DFDATACRIACAO } =
    producerCollect;
  const query = `
  INSERT INTO TBPRODUTORCOLETA (
    DFIDITEMCOLETA,
    DFIDITEMCOLETAAPP,
    DFIDPROPRIEDADE,
    DFQTDENTRADA,
    DFDATACRIACAO
  ) VALUES (?,?,?,?,?);
  `;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [
            `${DFIDITEMCOLETA || ''}`,
            `${DFIDITEMCOLETAAPP || ''}`,
            `${DFIDPROPRIEDADE || ''}`,
            `${DFQTDENTRADA || ''}`,
            DFDATACRIACAO || null,
          ],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) {
              resolve(insertId);
              return insertId;
            }
            resolve(null);
            return null;
          },
          _ => null,
        );
      });
    } catch (erro) {}
  });
};
export { insertProdutorColetaApi };
