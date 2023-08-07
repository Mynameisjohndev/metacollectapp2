import { SQLiteDatabase } from 'react-native-sqlite-storage';

import { RegistryItem } from '../../../types/registryItem';

interface IInsertItemRegistro {
  db: SQLiteDatabase;
  registerItem: RegistryItem;
  DFIDREGISTROAPP: string | number | boolean;
  DFREGISTROIMAGEM: string;
}
const insertItemRegistroApi = ({
  db,
  registerItem,
  DFIDREGISTROAPP,
  DFREGISTROIMAGEM,
}: IInsertItemRegistro): Promise<boolean> => {
  const { DFIDITEMREGISTRO, DFIDREGISTRO, DFITEMREGISTROENVIADO } =
    registerItem;
  const query = `
  INSERT INTO TBITEMREGISTRO (
    DFIDREGISTROAPP,
    DFREGISTROIMAGEM,
    DFIDITEMREGISTRO,
    DFIDREGISTRO,
    DFITEMREGISTROENVIADO
  ) VALUES (?,?,?,?,?);
  `;
  return new Promise(resolver => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        [
          `${DFIDREGISTROAPP || ''}`,
          `${DFREGISTROIMAGEM || ''}`,
          `${DFIDITEMREGISTRO || ''}`,
          `${DFIDREGISTRO}`,
          `${DFITEMREGISTROENVIADO || ''}`,
        ],
        (tx, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolver(true);
            return true;
          }
          resolver(false);
          return false;
        },
        _ => null,
      );
    });
  });
};
export { insertItemRegistroApi };
