import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { RegisterItem } from '../../../../types/registerItem';

interface IDeleteImage extends RegisterItem {
  db: SQLiteDatabase;
}

const deleteImage = ({
  db,
  DFREGISTROIMAGEM,
  DFIDITEMREGISTROAPP,
}: IDeleteImage): Promise<string | number | boolean> => {
  const query = `
  DELETE FROM TBITEMREGISTRO 
  WHERE DFIDITEMREGISTROAPP = ? AND DFREGISTROIMAGEM = ?`;

  return new Promise(resolve => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          query,
          [DFIDITEMREGISTROAPP, DFREGISTROIMAGEM],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              const id = results.insertId;
              resolve(id);
              return id;
            }
            return false;
          },
        );
      });
    } catch (error) {}
  });
};

export { deleteImage };
