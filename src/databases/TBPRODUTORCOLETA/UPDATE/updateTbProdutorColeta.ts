import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { ProducerCollect } from '../../../types/producerCollect';
import { insertProdutorColeta } from '../INSERT/insertProdutorColeta';

interface IUpdate extends ProducerCollect {
  db: SQLiteDatabase;
}
const updateTbProdutorColeta = async ({
  db,
  DFIDITEMCOLETAAPP,
  DFIDPROPRIEDADE,
  DFQTDENTRADA,
}: IUpdate): Promise<boolean> => {
  const queryUpdate = `
  UPDATE TBPRODUTORCOLETA SET 
  DFQTDENTRADA = ?
  WHERE DFIDITEMCOLETAAPP = ? 
  AND DFIDPROPRIEDADE = ?;
`;
  return new Promise(resolve => {
    db.transaction(tx => {
      tx.executeSql(
        queryUpdate,
        [DFQTDENTRADA, DFIDITEMCOLETAAPP, DFIDPROPRIEDADE],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(true);
            return true;
          }

          insertProdutorColeta({
            db,
            DFIDITEMCOLETAAPP: Number(DFIDITEMCOLETAAPP),
            DFIDPROPRIEDADE: Number(DFIDPROPRIEDADE),
            DFQTDENTRADA: Number(DFQTDENTRADA),
          }).then(res => {
            if (res) {
              resolve(res);
              return res;
            }
          });
        },
        _ => null,
      );
    });
  });
};

export { updateTbProdutorColeta };
